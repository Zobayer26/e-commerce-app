import prisma from "@/lib/prisma"


export type IProductParams = {
    category?: string | null,
    searchTerm?: string | null
}

export default async function getProducts(params: IProductParams) {
    try {
        const { category, searchTerm } = params
        let searchString = searchTerm
        if (!searchString) {
            searchString = ''
        }
        let query: any = []
        if (category) {
            query.category = category
        }

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [{
                    name: {
                        contains: searchString,
                        mode: 'insensitive'
                    },
                    description: {
                        contains: searchString,
                        mode: 'insensitive'
                    }
                }]

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