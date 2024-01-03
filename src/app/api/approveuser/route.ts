import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function PUT(req: Request) {

    try {
        const body = await req.json()
        const { userId, role } = body
        await prisma.user.update({
            where: { id: userId },
            data: { role: role }
        })
        return NextResponse.json({ message: "successful" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error occurd" })
    }
}