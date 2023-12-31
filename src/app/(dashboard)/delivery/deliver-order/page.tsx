import getDeliveryorder from "@/actions/getDeliveryorder";
import ManageDeliverOrder from "./ManageDeliverOrder";


const DeliverOrderPage = async () => {
    const deliverOrder: any = await getDeliveryorder()
    
    return (
        <div>
            <ManageDeliverOrder deliveryinfo={deliverOrder} />
        </div>
    );
};

export default DeliverOrderPage;