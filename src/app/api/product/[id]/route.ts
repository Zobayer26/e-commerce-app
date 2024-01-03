import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function DELETE(req: Request) {

    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'admin') {
        return NextResponse.error()
    }
    const body = await req.json()
    const { id } = body

    const product = await prisma.product?.delete({
        where: {
            id: id,
        }
    })
    return NextResponse.json(product)
}


export async function PUT(req: Request) {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role === 'user') {
        return NextResponse.error()
    }
    const body = await req.json()
    const { id, name, description, price, brand, category, inStock, images, quantity } = body
    const product = await prisma.product.update({
        where: {
            id: id,
        }, data: {
            name,
            description,
            price: parseFloat(price),
            brand,
            category,
            inStock,
            images,
            quantity
        }
    })
    return NextResponse.json(product)
}