import prisma from "@/lib/prisma"


export type IProductParams = {
    category?: string,
    lowprice?: any,
    highprice?:any,
    brand?: string,
}

export default async function getFilterProduct(params: IProductParams) {
    try {
        const { category, lowprice, highprice, brand } = params
        const products = await prisma.product.findMany({
            where: {
                OR: [{
                    category: category
                },
                {
                    brand: brand
                },
                ],
                AND: [
                    {
                        price: {
                            gte:parseFloat(lowprice),
                            lte: parseFloat(highprice)
                        },
                    },
                ]
            },
            include: {
                reviews: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdDate: 'desc'
                    }
                }
            }

        })
        return products

    } catch (error: any) {
        // throw new Error(error)
        console.log(error)
    }

}

