"use cache";

import { prisma } from "@/lib/db";
import { generateEmbedding } from "@/lib/search/embeddings";
import { cacheLife, cacheTag } from "next/cache";
import { SearchResultItem } from "./types";

export const getSearchFromLibrary = async (userId: string, search: string) => {
  cacheTag(`search-${userId}`);
  cacheLife("hours");

  const query = search?.trim();
  if (!query) return [];
  try {
    // 1. Full-Text Search Query (Lexical match with ranking & snippet generation)
    const ftsResults = await prisma.$queryRaw<
      Array<{
        id: string;
        title: string;
        source: string;
        url: string | null;
        snippet: string;
        rank: number;
        createdAt: Date;
      }>
    >`
      SELECT 
        id,
        title,
        source,
        url,
        "createdAt",
        ts_rank_cd(search_vector, websearch_to_tsquery('english', ${query})) AS rank,
        ts_headline(
          'english',
          content,
          websearch_to_tsquery('english', ${query}),
          'StartSel=<mark>, StopSel=</mark>, MaxWords=35, MinWords=15, ShortWord=3'
        ) AS snippet
      FROM "library_item"
      WHERE 
        "userId" = ${userId}
        AND search_vector @@ websearch_to_tsquery('english', ${query})
      ORDER BY rank DESC
      LIMIT 20;
    `;

    // 2. If OpenAI key is available, run Semantic Search and combine
    let vectorResults: Array<{ id: string; similarity: number }> = [];
    if (process.env.OPENAI_API_KEY) {
      try {
        const queryVector = await generateEmbedding(query);
        const vectorString = `[${queryVector.join(",")}]`;
        vectorResults = await prisma.$queryRaw<
          Array<{ id: string; similarity: number }>
        >`
          SELECT 
            id,
            1 - (embedding <=> ${vectorString}::vector) AS similarity
          FROM "library_item"
          WHERE 
            "userId" = ${userId}
            AND embedding IS NOT NULL
          ORDER BY embedding <=> ${vectorString}::vector ASC
          LIMIT 20;
        `;
      } catch (err) {
        console.warn("Semantic embedding generation skipped/failed:", err);
      }
    }

    // 3. Reciprocal Rank Fusion (RRF) to merge Full-Text and Semantic Results
    const scoreMap = new Map<
      string,
      { ftsRank?: number; semanticScore?: number }
    >();
    ftsResults.forEach((item, index) => {
      scoreMap.set(item.id, { ftsRank: 1 / (60 + index + 1) });
    });
    vectorResults.forEach((item, index) => {
      const existing = scoreMap.get(item.id) || {};
      existing.semanticScore = 1 / (60 + index + 1);
      scoreMap.set(item.id, existing);
    });

    // 4. Map and rank final merged results
    const results: SearchResultItem[] = ftsResults.map((item) => {
      const scores = scoreMap.get(item.id);
      const isHybrid = Boolean(scores?.ftsRank && scores?.semanticScore);
      return {
        id: item.id,
        title: item.title,
        source: item.source,
        url: item.url,
        snippet: item.snippet,
        score: (scores?.ftsRank || 0) + (scores?.semanticScore || 0),
        matchType: isHybrid ? "hybrid" : "keyword",
        createdAt: item.createdAt,
      };
    });
    return results.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
};
