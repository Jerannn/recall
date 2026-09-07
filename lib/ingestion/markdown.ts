import TurndownService from "turndown";

const turndownService = new TurndownService({
  headingStyle: "atx", // # Heading 1 instead of underlines
  codeBlockStyle: "fenced", // ```ts code blocks instead of 4 spaces
  bulletListMarker: "-",
  emDelimiter: "*",
});

// Remove unwanted script, style, and iframe tags
turndownService.remove(["script", "style", "noscript", "iframe"]);
turndownService.addRule("removeSvg", {
  filter: (node) => node.nodeName.toLowerCase() === "svg",
  replacement: () => "",
});

export function htmlToMarkdown(html: string): string {
  if (!html || !html.trim()) return "";
  return turndownService.turndown(html);
}
