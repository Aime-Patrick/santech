"use client";

import { PdfDocumentViewer } from "@/components/pdf-document-viewer";

export function CompanyProfilePdf({ url = "/images/SAN TECH COMPANY PROFILE (1).pdf" }: { url?: string }) {
  return <PdfDocumentViewer url={url} />;
}
