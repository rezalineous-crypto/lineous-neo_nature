import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DEFAULTS_PATH = path.join(process.cwd(), "config", "roi-config.defaults.json");

export async function GET() {
  try {
    const data = await fs.readFile(DEFAULTS_PATH, "utf-8");
    const defaults = JSON.parse(data);
    return NextResponse.json(defaults);
  } catch {
    return NextResponse.json(
      { error: "Defaults file not found" },
      { status: 404 }
    );
  }
}
