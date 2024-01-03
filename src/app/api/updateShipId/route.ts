import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()
    const { paymentId, shipId } = body
    const data = await prisma.order.findUnique({
        where: {
            payment_id: paymentId
        },
    })
    await prisma.shipping.update({
        where: { id: shipId },
        data: { orderId: data?.id }

    })
    await prisma.order.update({
        where: {
            payment_id: paymentId
        },
        data: { status: 'complete' }
    })

    return NextResponse.json({ message: 'update successfully' })
}