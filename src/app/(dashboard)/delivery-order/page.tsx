

import getDeliveryorder from "@/actions/getDeliveryorder";
import ManageDeliverOrder from "./ManageDeliverOrder";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/actions/getCurrentUser";


const page = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return null
    }
    const deliverymanid = await prisma.deliveryman.findUnique({
        where: { userId: currentUser.id }
    })

    const deliverorder = await prisma.deliverOrder.findMany({
        where: {
            deliverymanId: deliverymanid?.id
        }
    })
    return (
        <div>

            <ManageDeliverOrder deliveryinfo={deliverorder} />
        </div>
    );
};

export default page;