import prisma from "@/lib/prisma";



export default async function getDeliverymanByArea(area:string) {

    const result = await prisma.deliveryman.findMany({
        where: {
            area: area
        }
    })
    return result
}