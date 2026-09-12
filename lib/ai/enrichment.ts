import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { EnrichmentData, enrichmentSchema } from "./schema";

export async function generateContentEnrichment(
  title: string,
  content: string,
): Promise<EnrichmentData> {
  // Truncate to first 12,000 characters to keep API latency fast and token costs low
  const truncatedContent = content.slice(0, 12000);

  const { output } = await generateText({
    model: google("gemini-3.6-flash"), // Fast, reliable, and cost-effective
    output: Output.object({
      schema: enrichmentSchema,
    }),
    system:
      "You are an expert knowledge curator for a personal second-brain application called Recall. " +
      "Analyze the provided title and text, then extract a high-density summary, key takeaways, and relevant topic tags.",
    prompt: `
Title: ${title}

Content:
${truncatedContent}
    `,
  });

  // Normalize tags: lowercase, remove special characters, trim whitespace
  const sanitizedTags = output.tags
    .map((tag) =>
      tag
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "")
        .trim(),
    )
    .filter((tag) => tag.length > 0);

  return {
    ...output,
    tags: Array.from(new Set(sanitizedTags)), // Deduplicate tags
  };
}
