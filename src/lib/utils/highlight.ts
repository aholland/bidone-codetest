/**
 * Escapes special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Highlights search terms in text by wrapping them in <mark> tags
 * @param text The text to highlight
 * @param searchTerm The search term to highlight
 * @returns HTML string with highlighted terms
 */
export function highlightText(text: string, searchTerm: string): string {
  if (!searchTerm || !text) {
    return text;
  }

  // Escape special regex characters and create case-insensitive regex
  const escapedTerm = escapeRegex(searchTerm);
  const regex = new RegExp(`(${escapedTerm})`, 'gi');
  
  // Replace matches with highlighted version
  return text.replace(regex, '<mark class="bg-yellow-200 text-inherit">$1</mark>');
}