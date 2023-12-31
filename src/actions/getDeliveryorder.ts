import prisma from "@/lib/prisma";
import { getCurrentUser } from "./getCurrentUser";
import { NextResponse } from "next/server";


export default async function getDeliveryorder() {

   try {
      const currentuser = await getCurrentUser()
      if (!currentuser) {
         return NextResponse.json({ message: "access denied" })
      }
      const deliverymanid = await prisma.deliveryman.findUnique({
         where: { userId: currentuser.id }
      })

      const deliverorder = await prisma.deliverOrder.findMany({
         where: {
            deliverymanId: deliverymanid?.id
         }
      })
      return deliverorder

   } catch (error) {
      console.log(error)
   }

}