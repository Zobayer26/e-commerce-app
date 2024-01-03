import Container from "@/components/Container";
import ShippingForm from "./ShippingForm";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Shipping = async () => {
    const currentUser = await getCurrentUser()
    return (
        <Container>
            <ShippingForm currentUser={currentUser} />
        </Container>
    );
};

export default Shipping;