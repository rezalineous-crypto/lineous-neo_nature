import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const PASSWORD_HASH = process.env.ROI_ADMIN_PASSWORD_HASH || "";
const COOKIE_SECRET = process.env.ADMIN_COOKIE_SECRET || "fallback-secret-change-me";
const DEV_PASSWORD = "Admin123";

function verifyPassword(password: string): boolean {
  if (PASSWORD_HASH) {
    return bcrypt.compareSync(password, PASSWORD_HASH);
  }
  // Fallback for development when env var is not set
  return password === DEV_PASSWORD;
}

function createSessionCookie(): string {
  const payload = JSON.stringify({
    admin: true,
    iat: Date.now(),
  });
  const signature = bcrypt.hashSync(payload + COOKIE_SECRET, 10);
  return Buffer.from(payload).toString("base64") + "." + signature;
}

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const cookieValue = createSessionCookie();

    const cookieStore = await cookies();
    cookieStore.set("admin_session", cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}