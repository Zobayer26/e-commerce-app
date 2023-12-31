import prisma from "@/lib/prisma";

export default async function getOrderInfo(params: string) {
    const order = await prisma.order.update({
        where: {
            payment_id: params
        },
        data: {
            status: 'complete'
        }
    })
    return order
}