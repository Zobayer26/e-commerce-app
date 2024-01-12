import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function DELETE(req: Request) {
    const body = await req.json()
    const { userId } = body
    try {

        await prisma.user.delete({
            where: {
                id: userId
            }
        })
        return NextResponse.json({ messaqge: "succesfully deleted" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ messaqge: "error occur" })
    }
}