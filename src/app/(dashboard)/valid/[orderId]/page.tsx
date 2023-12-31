import Container from "@/components/Container";
import DeliveryForm from "./DeliveryForm";

type Iparams = {
  orderId?: string
}

const SendOrder = ({ params }: { params: Iparams }) => {
  const orderId: any = params.orderId
  return (
    <Container>
      <DeliveryForm orderId={orderId} />
    </Container>
  );
};

export default SendOrder;