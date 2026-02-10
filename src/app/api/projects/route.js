import { dbConnect } from "@/db/dbConnect";
import projects from "@/models/projects";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const projectData = await projects.find();
    return NextResponse.json({ data: projectData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch projects",
        details: error,
      },
      { status: 500 },
    );
  }
}

export async function POST() {
  await dbConnect();

  const body = await req.json();
  const project = await projects.create(body);

  return NextResponse.json({ data: project }, { status: 201 });
}
