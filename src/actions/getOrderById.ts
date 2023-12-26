import prisma from "@/lib/prisma"


type Iparams = {
    orderId?: string
}
export default async function getOrderById(params: Iparams) {
    try {
        const { orderId } = params

        const order = await prisma.order.findUnique({
            where: {
                id: orderId
            }
        })
        if (!order) {
            return null
        }

        return order
    } catch (error: any) {
        console.log(error)
    }
}