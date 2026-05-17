import { dbConnect } from "@/db/dbConnect";
import Projects from "@/models/projects";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/utils/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const projectData = await Projects.find().lean();
    return NextResponse.json({ data: projectData }, { status: 200 });
  } catch (error) {
    console.error("GET /projects error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch projects",
        details: error.message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();

    if (!body?.name || !body?.image || !body?.category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    const project = await Projects.create(body);

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error("POST /projects error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create project" },
      { status: 500 },
    );
  }
}
