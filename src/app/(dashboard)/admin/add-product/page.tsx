import AddProduct from "./AddProduct";
// import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import NullData from "@/components/admin/NullData";

const AddProductPage = async () => {

    // const currentUser = await getCurrentUser()
    // if (!currentUser || currentUser.role !== 'admin') {
    //     return <NullData title="Oop! Access Denied" />
    // }

    return (
        <div className="p-8">
            <Container>
                <div className="max-w-[700px] mx-auto">
                <AddProduct />
                </div>
            </Container>
        </div>
    );
};

export default AddProductPage;