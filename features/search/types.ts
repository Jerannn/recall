export type SearchQueryParams = {
  search?: string;
};

export type SearchResultItem = {
  id: string;
  title: string;
  source: string;
  url: string | null;
  snippet: string; // Text snippet with <mark>...</mark> highlights
  score: number; // Relevance score
  matchType: "keyword" | "semantic" | "hybrid";
  createdAt: Date;
};
