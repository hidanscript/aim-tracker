import { connectDB } from "@/lib/mongoose";
import TrainingSession from "@/models/TrainingSession";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const sessions = await TrainingSession.find().sort({ date: -1 });
  return NextResponse.json(sessions);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const { exercise, duration, hits } = body;

  // Validación básica
  if (!exercise) {
    return NextResponse.json({ error: "Ejercicio requerido" }, { status: 400 });
  }

  // Validar condición: Bots Hard usa hits, otros usan duration
  if (
    (exercise === "Bots Hard" && typeof hits !== "number") ||
    (exercise !== "Bots Hard" && typeof duration !== "number")
  ) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const session = new TrainingSession({
    exercise,
    duration: exercise === "Bots Hard" ? 0 : duration,
    hits: exercise === "Bots Hard" ? hits : 0,
  });

  await session.save();
  return NextResponse.json(session);
}