export interface ExtractedArticle {
  title: string;
  content: string; // Clean Markdown content
  summary?: string; // Short excerpt or description
  source: string; // Domain name (e.g., "github.com", "nytimes.com")
  url: string; // Normalized URL
  author?: string;
  publishedAt?: string;
  imageUrl?: string;
}

export type ExtractionResult =
  { success: true; data: ExtractedArticle } | { success: false; error: string };
