-- 1. Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Add the 1536-dimension vector embedding column
ALTER TABLE "library_item" 
ADD COLUMN IF NOT EXISTS "embedding" vector(1536);

-- 3. Add generated tsvector column combining title (Weight A), summary (Weight B), and content (Weight C)
ALTER TABLE "library_item"
ADD COLUMN IF NOT EXISTS "search_vector" tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', coalesce("title", '')), 'A') ||
  setweight(to_tsvector('english', coalesce("summary", '')), 'B') ||
  setweight(to_tsvector('english', coalesce("content", '')), 'C')
) STORED;

-- 4. Create GIN index for full-text search
CREATE INDEX IF NOT EXISTS "library_item_search_vector_idx" 
ON "library_item" USING GIN ("search_vector");

-- 5. Create HNSW index for vector cosine similarity search
CREATE INDEX IF NOT EXISTS "library_item_embedding_idx" 
ON "library_item" USING hnsw ("embedding" vector_cosine_ops);