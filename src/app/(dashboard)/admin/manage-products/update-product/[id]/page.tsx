
import UpdateProduct from "./UpdateProduct";
import prisma from "@/lib/prisma";
import Container from "@/components/Container";

type Iparams = {
    id: string
}

const page = async ({ params }: { params: Iparams }) => {
    const product: any = await prisma.product.findUnique({
        where: { id: params.id }
    })


    return (
        <div>
            
            <Container>
                <UpdateProduct productId={params.id} product={product} />
            </Container>

        </div>
    );
};

export default page;