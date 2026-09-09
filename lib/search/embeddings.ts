// lib/search/embeddings.ts

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!text || !text.trim()) {
    return [];
  }

  // Sanitize text by removing excessive newlines
  const sanitized = text.replace(/\n+/g, " ").slice(0, 8000);

  // Example using OpenAI Embeddings API (or any provider like Cohere / Ollama)
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: sanitized,
    }),
  });

  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data[0].embedding;
}
