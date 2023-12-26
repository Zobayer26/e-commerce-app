import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const body = await req.json();
    const { id, quantity } = body
    const dd: any = await prisma.product.findUnique({
        where: {
            id: id
        }
    })

    let dataquantity = parseInt(dd?.quantity)
    dataquantity -= quantity

    const qqq = await prisma.product.update({
        where: {
            id: id
        }, data: {
            quantity: dataquantity.toString()
        }
    })
    return NextResponse.json({ message: 'update successful' })

}