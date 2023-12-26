import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function POST(req: Request) {

    try {
        const body = await req.json()

        const { comment, rating, userId, productId} = body
        const review = await prisma.review.create({
            data: {
                userId: userId,
                productId: productId,
                comment: comment,
                rating: rating
            }
        })
        return NextResponse.json({ review })
    } catch (error) {
        return NextResponse.json({ error })
    }

}