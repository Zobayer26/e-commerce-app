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
    if (dataquantity <= 0) {
        const uqq = await prisma.product.update({
            where: {
                id: id
            }, data: {
                quantity: dataquantity.toString(),
                inStock: false
            }
        })
        return NextResponse.json({ message: 'update successful' })
    }
    const qqq = await prisma.product.update({
        where: {
            id: id
        }, data: {
            quantity: dataquantity.toString()
        }
    })
    return NextResponse.json({ message: 'update successful' })

}