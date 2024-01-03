import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

  const body = await req.json()
  const { area } = body
  const data = await prisma.deliveryman.findMany({
    where: {
      area: area 
    }
  })
  return NextResponse.json({ data })
}