import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req: Request) {

    const body = await req.json()
    const { orderId } = body
    await prisma.order.update({
        where: { id: orderId },
        data: { deliveryStatus: 'Compelete' }
    })
    return NextResponse.json({ message: 'successfuly' })
}