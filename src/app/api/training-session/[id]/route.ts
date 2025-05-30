import { connectDB } from "@/lib/mongoose";
import TrainingSession from "@/models/TrainingSession";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();

  try {
    const { id } = await params;
    await TrainingSession.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "No se pudo eliminar" }, { status: 500 });
  }
}
