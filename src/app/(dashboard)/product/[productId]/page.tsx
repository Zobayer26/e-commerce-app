
import ProductDetails from "@/components/ProductStyle/ProductDetails";
import ReviewList from "./ReviewList";
// import { products } from "@/utils/products";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import getProductById from "@/actions/getProductById";
import NullData from "@/components/admin/NullData";


type productIdProps = {
    productId?: string
}

const SingleProductPage = async ({ params }: { params: productIdProps }) => {

    const user:any = await getCurrentUser()
    const singleProduct:any = await getProductById(params)
    if(!singleProduct){
        return <NullData title="Opop! product not found"/>
    }
    return (
        <div className="p-8">
            <Container>
                <ProductDetails product={singleProduct} />
                <AddRating product={singleProduct} user={user} />
                <ReviewList product={singleProduct} />
            </Container>
        </div>
    );
};

export default SingleProductPage;