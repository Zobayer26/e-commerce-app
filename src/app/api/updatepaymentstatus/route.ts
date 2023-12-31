import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const body = await req.json()
    const { paymentId } = body
    const order = await prisma.order.findUnique({
        where: {
            payment_id: paymentId
        }
    })
    const updateorder = await prisma.order.update({
        where: {
            id: order?.id
        },
        data: {
            status: 'complete'
        }
    })
    return NextResponse.json({ updateorder })
}