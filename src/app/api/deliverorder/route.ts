import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const body = await req.json()
    const { orderId, deliverymanId, customername, phone,
        district, address, customerphone, notes } = body
    const deliverorder = await prisma.deliverOrder.create({
        data: {
            orderId: orderId,
            deliverymanId: deliverymanId,
            customername: customername,
            phone: phone,
            address: address,
            district: district,
            customerphone: customerphone,
            notes: notes
        }
    })
    return NextResponse.json({
       deliverorder, message: 'create successfully'
    })

}