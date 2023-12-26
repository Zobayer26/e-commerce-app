import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function PUT(req: Request) {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'admin') {
        return NextResponse.error()
    }
    const body = await req.json()
    const { id, deliveryStatus } = body
    const order = await prisma.order.update({
        where: {
            id: id,
        }, data: { deliveryStatus },
    })
    return NextResponse.json(order)
}

