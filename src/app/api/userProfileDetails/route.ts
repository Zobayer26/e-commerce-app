import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const body = await req.json()
    const { userId, phone, Address, birthdate, Gender, Bio } = body
    try {
        const info = await prisma.profile.create({
            data: {
                phone: phone,
                Address: Address,
                birthdate: birthdate,
                Gender: Gender,
                Bio: Bio,
                userId: userId
            }
        })
        return NextResponse.json({ message: "account create successfully" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "erro occured during create profile3" })
    }

}