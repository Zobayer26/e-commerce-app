import Container from "@/components/Container";

import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/admin/NullData";
import OrderClientPage from "./OrderClient";
import { getOrderByUserId } from "@/actions/getOrderByUserId";


const ManageOrderPage = async () => {


    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <NullData title=" Access denied" />
    }
    const orders = await getOrderByUserId(currentUser.id)
    return (
        <div className="pt-8">
            <Container>
                <OrderClientPage orders={orders} />
            </Container>
        </div>
    );
};

export default ManageOrderPage;