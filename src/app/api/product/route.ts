import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"




export async function POST(req: Request) {

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




