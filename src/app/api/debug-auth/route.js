// src/app/api/debug-auth/route.ts
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId, sessionId } = getAuth(req);

  console.log("DEBUG → userId:", userId, "sessionId:", sessionId);
  console.log(
    "DEBUG → env PK prefix:",
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.slice(0, 25)
  );
  console.log(
    "DEBUG → env SK prefix:",
    process.env.CLERK_SECRET_KEY?.slice(0, 25)
  );

  return NextResponse.json({
    userId,
    sessionId,
    envPKPrefix: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.slice(0, 25),
    envSKPrefix: process.env.CLERK_SECRET_KEY?.slice(0, 25),
  });
}
