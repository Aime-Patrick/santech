/**
 * Converts a PDF path or URL into a safe inline URL.
 *
 * 1. If it's an external URL (e.g. "https://domain.com/doc.pdf"), it returns the URL directly.
 * 2. If it's a local public file (e.g. "/images/SAN TECH COMPANY PROFILE (1).pdf"),
 *    it routes through `/api/pdf?file=...` with `Content-Disposition: inline` headers
 *    so browsers open it in their built-in reader tab instead of auto-downloading.
 */
export function getInlinePdfUrl(pdfPathOrUrl: string): string {
  if (!pdfPathOrUrl) return "";

  // If already an absolute external web URL, return as-is
  if (pdfPathOrUrl.startsWith("http://") || pdfPathOrUrl.startsWith("https://")) {
    return pdfPathOrUrl;
  }

  // Extract filename safely from local paths
  const filename = pdfPathOrUrl.split("/").pop();
  if (!filename) return pdfPathOrUrl;

  return `/api/pdf?file=${encodeURIComponent(filename)}`;
}
