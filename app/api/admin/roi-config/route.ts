import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { z } from "zod";

const CONFIG_PATH = path.join(process.cwd(), "config", "roi-config.json");
const BACKUP_PATH = path.join(process.cwd(), "config", "roi-config.backup.json");
const DEFAULTS_PATH = path.join(process.cwd(), "config", "roi-config.defaults.json");

const PASSWORD_HASH = process.env.ROI_ADMIN_PASSWORD_HASH || "";
const COOKIE_SECRET = process.env.ADMIN_COOKIE_SECRET || "fallback-secret-change-me";

const ConfigSchema = z.object({
  version: z.number().min(1),
  calculator: z.object({
    defaults: z.object({
      investmentAmount: z.number().min(100000).max(2000000),
      duration: z.number().int().min(1).max(20),
      typeId: z.string(),
    }),
    limits: z.object({
      investmentMin: z.number(),
      investmentMax: z.number(),
      investmentStep: z.number(),
    }),
    investmentTypes: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        yield: z.number().min(0).max(50),
        appreciation: z.number().min(0).max(20),
        description: z.string(),
      })
    ),
    durationOptions: z.array(z.number().int().min(1).max(20)),
  }),
});

function verifyPassword(password: string): boolean {
  if (PASSWORD_HASH) {
    return bcrypt.compareSync(password, PASSWORD_HASH);
  }
  // Fallback for development
  return password === "Admin123";
}

function createSessionCookie(): string {
  const payload = JSON.stringify({
    admin: true,
    iat: Date.now(),
  });
  const signature = bcrypt.hashSync(payload + COOKIE_SECRET, 10);
  return Buffer.from(payload).toString("base64") + "." + signature;
}

function verifySessionCookie(cookieValue: string): boolean {
  try {
    const dotIndex = cookieValue.indexOf(".");
    if (dotIndex === -1) return false;
    const payloadB64 = cookieValue.slice(0, dotIndex);
    const signature = cookieValue.slice(dotIndex + 1);
    const payload = Buffer.from(payloadB64, "base64").toString("utf-8");
    return bcrypt.compareSync(payload + COOKIE_SECRET, signature);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("admin_session")?.value;

  if (!sessionCookie || !verifySessionCookie(sessionCookie)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = ConfigSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid configuration", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Create backup only if it doesn't already exist
    // This preserves the original defaults as a fallback
    try {
      await fs.access(BACKUP_PATH);
      // Backup already exists, don't overwrite it
    } catch {
      // No backup exists yet, create one from current config
      try {
        const existing = await fs.readFile(CONFIG_PATH, "utf-8");
        await fs.writeFile(BACKUP_PATH, existing);
      } catch {
        // No existing file to backup, that's fine
      }
    }

    // Write new config
    const config = {
      ...parsed.data,
      updatedAt: new Date().toISOString(),
      updatedBy: "Admin",
    };

    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));

    return NextResponse.json({ success: true, config });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update configuration" },
      { status: 500 }
    );
  }
}