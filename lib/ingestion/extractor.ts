import { Readability } from "@mozilla/readability";
import * as cheerio from "cheerio";
import { parseHTML } from "linkedom";
import { htmlToMarkdown } from "./markdown";
import { validateSafeUrl } from "./security";
import { ExtractedArticle, ExtractionResult } from "./types";

const FETCH_TIMEOUT_MS = 10000; // 10-second timeout
const MAX_CONTENT_LENGTH = 5 * 1024 * 1024; // 5 MB max response limit

const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

export async function extractUrlContent(
  rawUrl: string,
): Promise<ExtractionResult> {
  try {
    // 1. Validate & sanitize URL against SSRF
    const safeUrl = validateSafeUrl(rawUrl);

    // 2. Fetch the page with timeout and custom headers
    const response = await fetch(safeUrl.toString(), {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: {
        "User-Agent": BROWSER_USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch webpage (HTTP status: ${response.status} ${response.statusText})`,
      };
    }

    const contentType = response.headers.get("content-type") || "";
    if (
      !contentType.includes("text/html") &&
      !contentType.includes("application/xhtml+xml")
    ) {
      return {
        success: false,
        error: "The provided URL is not an HTML webpage.",
      };
    }

    const html = await response.text();
    if (html.length > MAX_CONTENT_LENGTH) {
      return {
        success: false,
        error: "Webpage content exceeds maximum allowed size (5MB).",
      };
    }

    // 3. Parse OpenGraph & fallback metadata with Cheerio
    const $ = cheerio.load(html);
    const ogTitle = $('meta[property="og:title"]').attr("content");
    const ogDescription = $('meta[property="og:description"]').attr("content");
    const metaDescription = $('meta[name="description"]').attr("content");
    const ogSiteName = $('meta[property="og:site_name"]').attr("content");
    const ogAuthor =
      $('meta[name="author"]').attr("content") ||
      $('meta[property="article:author"]').attr("content");
    const ogImage = $('meta[property="og:image"]').attr("content");

    // 4. Parse main article body with Mozilla Readability + LinkeDOM
    const { document } = parseHTML(html);
    const reader = new Readability(document, { charThreshold: 20 });
    const article = reader.parse();

    // 5. Build clean title & content
    const title =
      article?.title || ogTitle || $("title").text().trim() || safeUrl.hostname;
    const summary =
      article?.excerpt || ogDescription || metaDescription || undefined;
    const source = ogSiteName || safeUrl.hostname.replace(/^www\./, "");

    // Convert extracted article HTML to Markdown, or fallback to description
    let markdownContent = "";
    if (article?.content) {
      markdownContent = htmlToMarkdown(article.content);
    } else if (summary) {
      markdownContent = `> ${summary}\n\n*Source: [${safeUrl.href}](${safeUrl.href})*`;
    } else {
      markdownContent = `*No readable text body could be extracted. Visit the source link: [${safeUrl.href}](${safeUrl.href})*`;
    }

    const result: ExtractedArticle = {
      title,
      content: markdownContent,
      summary,
      source,
      url: safeUrl.toString(),
      author: article?.byline || ogAuthor || undefined,
      publishedAt: article?.publishedTime || undefined,
      imageUrl: ogImage || undefined,
    };

    return { success: true, data: result };
  } catch (error: any) {
    if (error.name === "TimeoutError") {
      return {
        success: false,
        error: "The webpage took too long to respond (timeout).",
      };
    }
    return {
      success: false,
      error:
        error.message || "An unexpected error occurred while parsing the URL.",
    };
  }
}
