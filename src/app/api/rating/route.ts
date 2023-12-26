import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prisma";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }
    const body = await req.json()
    const { comment, rating, product, userId } = body
    
    const deliveredOrder = currentUser?.orders.some(order => order.products.find(
        item => item.id === product.Id) && order.deliveryStatus === 'delivered')

    const userReview = product?.reviews.find(((review: Review) => {
        return review.userId === currentUser.id
    }))

    if (userReview || !deliveredOrder) {
        return NextResponse.error()
    }

    const review= await prisma.review.create({
        data:{
            rating:rating,
            comment:comment,
            userId:userId,
            productId:product.Id
        }
    })
    return NextResponse.json(review)
}