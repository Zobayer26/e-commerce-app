import Container from "@/components/Container";
import CheckoutClient from "./CheckoutClient";

const CheckoutPage = ({params}:{params:{shipId:string}}) => {
    console.log(params.shipId)
    return (
        <div  className="p-8">
            <Container>
                <CheckoutClient shipId={params.shipId}/>
            </Container>
        </div>
    );
};

export default CheckoutPage;