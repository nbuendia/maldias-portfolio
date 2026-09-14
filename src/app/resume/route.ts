import path from "path";
import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "resumes", "resume2025.pdf");
    const file = await readFile(filePath) as Buffer<ArrayBuffer>;
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");

    const options = { headers };
    
    return new NextResponse(file, options);
} catch (error) {
    const options = {status: 500, statusText: "Server Error"};

    console.error(error);
    return new NextResponse("Failed to load resume, Please try again later.", options);
  }
}
