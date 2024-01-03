import getFilterProduct from "@/actions/getFilterData";

import ProductCart from '@/components/ProductStyle/ProductCart'
import Container from "@/components/Container";
import NullData from "@/components/admin/NullData";

const page = async ({ searchParams }: {
    searchParams: {
        lowprice: number,
        highprice: number,
        brand: string,
        category: string
    }
}) => {
    const products: any = await getFilterProduct({
        category: searchParams.category, lowprice: searchParams.lowprice,
        brand: searchParams.brand, highprice: searchParams.highprice
    })
    if (products.length == 0) {
        return <NullData title=" No product Found" />
    }
    return (

        <div className="flex-grow">
            <Container>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
                         xl:grid-cols-5 2xl:grid-cols-6 gap-8">

                    {products.map((item: any) => {
                        return <ProductCart data={item} key={item.id} />
                    })}

                </div>

            </Container>
        </div>
    );
};

export default page;