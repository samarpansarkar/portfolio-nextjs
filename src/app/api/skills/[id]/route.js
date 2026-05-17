import { dbConnect } from "@/db/dbConnect";
import Skills from "@/models/skills";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/utils/auth";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const updated = await Skills.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return NextResponse.json({ success: false, error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params;

    const deleted = await Skills.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Skill deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
