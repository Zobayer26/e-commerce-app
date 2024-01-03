import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    const user = await prisma.order.findUnique({
        where: {
            id: '65756d958c0f5056b253925d'
        },
        select: { user: true } 
    })

    console.log(user?.user.email)
    return NextResponse.json({ user, message: 'works' }, { status: 200 })
}

// const user = await prisma.order
// .findUnique({
//     where: { id: orderId },
//     select: { user: { select: { email: true } } },
//   })
//   .user();