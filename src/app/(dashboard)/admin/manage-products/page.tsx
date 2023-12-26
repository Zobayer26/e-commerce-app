import Container from "@/components/Container";
import ManageProducts from "./ManageProducts";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/admin/NullData";

const ManageProductPage = async () => {

    const products:any = await getProducts({ category: null })
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role === 'user') {
        return <NullData title=" Access denied" />
    }
    return (
        <div className="pt-8">
            <Container>
                <ManageProducts products={products} />
                <div>mange</div>
            </Container>
        </div>
    );
};

export default ManageProductPage;