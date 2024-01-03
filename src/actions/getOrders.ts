import prisma from "@/lib/prisma"


export async function getOrders() {
    try {

        const orders = await prisma.order.findMany({
           include: {
                user: true
            },
            orderBy: {
                createDate: 'desc'
            }
        })
        return orders

    } catch (error: any) {
        // throw new Error(error)
        console.log(error)
    }
}