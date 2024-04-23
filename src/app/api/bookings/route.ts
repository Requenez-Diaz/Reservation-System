import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
  } catch (error) {
    return NextResponse.json({ message: '¡Algo salió mal!' }, { status: 500 });
  }
}
