import getDeliverymanByArea from "@/actions/getDeliverymanByArea";
import prisma from "@/lib/prisma";
import AssignDelivery from "./AssignDelivery";


const page = async ({ params }: any) => {

    const area:any= await prisma.order.findUnique({
        where: {
            id: params.id
        }, select: {
            Shipping: true
        }

    })
    const DeliverymanByArea: any = await getDeliverymanByArea(area?.Shipping?.district)
    return (
        <div>
            <AssignDelivery deliveryman={DeliverymanByArea} orderId={params.id} shipping={area.Shipping}/>
        </div>
    );
};

export default page;