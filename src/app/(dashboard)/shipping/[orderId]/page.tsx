import Container from "@/components/Container";
import ShippingForm from "./ShippingForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getOrderInfo from "@/actions/getOrderInfo";


type Iparams = {
    orderId?: string
}

const Shipping = async ({ params }: { params: Iparams }) => {
    const id: any = params.orderId
    const order = await getOrderInfo(id)
    const currentUser = await getCurrentUser()
    return (
        <Container>
            <ShippingForm currentUser={currentUser} orderId={order.id} />
        </Container>
    );
};

export default Shipping;