import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    return NextResponse.json({ message: "works" })

}

export async function POST(req: Request) {
    try {


        const body = await req.json()
        const { name, email, phone, address, district, notes } = body
        const info = await prisma.shipping.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                address: address,
                district: district,
                notes: notes,
            }
        })
        return NextResponse.json({ info, message: "shiping information create successfuly" })
    } catch (error) {

        return NextResponse.json({ error })
    }
}