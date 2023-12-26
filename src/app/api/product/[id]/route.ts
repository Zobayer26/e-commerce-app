import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function DELETE(req: Request, { params }: { params: { id: string } }) {



    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role === 'user') {
        return NextResponse.error()
    }
    const product = await prisma?.product.delete({
        where: {
            id: params.id,
        }
    })
    return NextResponse.json(product)
}
