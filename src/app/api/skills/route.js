import { dbConnect } from "@/db/dbConnect";
import Skill from "@/models/skill";

import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  const skills = await Skill.find();

  return NextResponse.json({ data: skills }, { status: 200 });
}

export async function POST(req) {
  await dbConnect();

  const body = await req.json();

  const skill = await Skill.create(body);
  return NextResponse.json({ data: skill }, { status: 201 });
}
