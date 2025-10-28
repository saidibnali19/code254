import { htmlToText } from "html-to-text";

export function getExcerptFromHTML(html: string, wordLimit = 30) {
  const text = htmlToText(html, { wordwrap: false });
  const words = text.split(/\s+/).slice(0, wordLimit);
  return words.join(" ") + (words.length >= wordLimit ? "..." : "");
}
