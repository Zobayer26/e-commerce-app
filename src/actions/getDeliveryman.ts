import prisma from "@/lib/prisma";


export default async function getDeliveryman() {

    const result = await prisma.deliveryman.findMany(
        {
            include: {
                user: true
            },
        }
    )
    return result
}