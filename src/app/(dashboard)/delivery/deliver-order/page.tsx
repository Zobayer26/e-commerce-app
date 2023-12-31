import getDeliveryorder from "@/actions/getDeliveryorder";
import ManageDeliverOrder from "./ManageDeliverOrder";
import { getCurrentUser } from "@/actions/getCurrentUser";


const page = async () => {
    const deliverOrder: any = await getDeliveryorder()
    
    return (
        <div>
            <ManageDeliverOrder deliveryinfo={deliverOrder} />
        </div>
    );
};

export default page;