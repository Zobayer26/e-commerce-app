import Container from "@/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import NullData from "@/components/admin/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";



type Iparams = {
    orderId?: string
}

const OrderPage = async ({ params }: { params: Iparams }) => {

    const order = await getOrderById(params)

    if (!order) {
        return <NullData title="No Order found" />
    }
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'admin') {
        return <NullData title="Oops Access Denied" />
    }
    return (
        <div className="p-8">
            <Container>
                <OrderDetails order={order} />
            </Container>
        </div>
    );
};

export default OrderPage;