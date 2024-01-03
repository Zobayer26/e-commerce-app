

import prisma from "@/lib/prisma"


export async function getOrderByUserId(userId: string) {
    try {

        const orders = await prisma.order.findMany({
            include: {
                user: true
            },
            orderBy: {
                createDate: 'desc'
            },
            where: {
                userId: userId
            }
        })
        return orders

    } catch (error: any) {
        throw new Error(error)
    }
}