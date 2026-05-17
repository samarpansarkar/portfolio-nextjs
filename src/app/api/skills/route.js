import { dbConnect } from "@/db/dbConnect";
import Skills from "@/models/skills";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/utils/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();

  const skills = await Skills.find();

  return NextResponse.json({ data: skills }, { status: 200 });
}

export async function POST(req) {
  const user = getAuthUser(req);
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  const body = await req.json();

  const skill = await Skills.create(body);
  return NextResponse.json({ data: skill }, { status: 201 });
}
