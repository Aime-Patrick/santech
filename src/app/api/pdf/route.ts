import { NextRequest, NextResponse } from "next/server";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { join, basename } from "node:path";
import { Readable } from "node:stream";

/**
 * Serves PDF files from public/images with Content-Disposition: inline
 * so browsers display them in their built-in PDF viewer instead of downloading.
 *
 * Uses streaming to handle large files (e.g. 19MB company profile) efficiently.
 *
 * Usage: /api/pdf?file=SAN%20TECH%20COMPANY%20PROFILE%20(1).pdf
 */
export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "Missing 'file' query parameter" }, { status: 400 });
  }

  // Prevent directory traversal
  const sanitizedFile = basename(file);
  if (sanitizedFile !== file || file.includes("..")) {
    return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
  }

  if (!sanitizedFile.toLowerCase().endsWith(".pdf")) {
    return NextResponse.json({ error: "Only PDF files are supported" }, { status: 400 });
  }

  const filePath = join(process.cwd(), "public", "images", sanitizedFile);

  try {
    const fileStat = await stat(filePath);

    // Stream the file instead of reading it all into memory
    const nodeStream = createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream) as ReadableStream;

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${sanitizedFile}"`,
        "Content-Length": String(fileStat.size),
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
        "Accept-Ranges": "bytes",
      },
    });
  } catch {
    return NextResponse.json({ error: "PDF not found" }, { status: 404 });
  }
}
