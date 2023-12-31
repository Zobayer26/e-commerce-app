import prisma from "@/lib/prisma";
import { getCurrentUser } from "./getCurrentUser";


export default async function getDeliveryorder() {
   const currentuser = await getCurrentUser()
   const deliverymanid = await prisma.deliveryman.findUnique({
      where: { userId: currentuser?.id }
   })

   const deliverorder = await prisma.deliverOrder.findMany({
      where: {
         deliverymanId: deliverymanid?.id
      }
   })
   return deliverorder
}