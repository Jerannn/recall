import { z } from "zod";

export const enrichmentSchema = z.object({
  summary: z
    .string()
    .describe(
      "A crisp 2-3 sentence executive summary explaining what the content is about.",
    ),
  keyTakeaways: z
    .array(z.string())
    .min(2)
    .max(5)
    .describe(
      "2 to 5 concise, actionable bullet-point takeaways from the content.",
    ),
  tags: z
    .array(z.string())
    .min(1)
    .max(5)
    .describe(
      "1 to 5 concise, lowercase topic tags (e.g. 'nextjs', 'postgres', 'security').",
    ),
});

export type EnrichmentData = z.infer<typeof enrichmentSchema>;
