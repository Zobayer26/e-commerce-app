import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"




export async function POST(req: Request) {

    // const currentUser = await getCurrentUser()
    // if (!currentUser || currentUser.role !== 'admin') {
    //     return NextResponse.error()
    // }
    const body = await req.json()
    const { name, description, price, brand, category, inStock, images ,quantity} = body
    const product = await prisma.product.create({
        data: {
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
    return NextResponse.json({ product, message: "create Successfully" })
}


export async function PUT(req: Request) {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role === 'user') {
        return NextResponse.error()
    }
    const body = await req.json()
    const { id, inStock } = body
    const product = await prisma.product.update({
        where: {
            id: id,
        }, data: {
            inStock
        }
    })
    return NextResponse.json(product)
}

