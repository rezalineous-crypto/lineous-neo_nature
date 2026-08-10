import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "config", "roi-config.json");
const DEFAULTS_PATH = path.join(process.cwd(), "config", "roi-config.defaults.json");

export async function GET() {
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf-8");
    const config = JSON.parse(raw);
    return NextResponse.json(config);
  } catch {
    // If config file is missing or corrupted, return defaults
    try {
      const raw = await fs.readFile(DEFAULTS_PATH, "utf-8");
      const defaults = JSON.parse(raw);
      return NextResponse.json(defaults);
    } catch {
      return NextResponse.json(
        { error: "Configuration not found" },
        { status: 500 }
      );
    }
  }
}