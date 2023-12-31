
import Stripe from 'stripe'
import prisma from '@/lib/prisma'
import { Cartproduct } from '@/components/ProductStyle/ProductDetails'
import { getCurrentUser } from '@/actions/getCurrentUser'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16"
})


const CalculateOrderPayment = (item: Cartproduct[]) => {

    const totalPrice = item.reduce((acc, item) => {
        const itemTotal = item.price * item.qunatity
        return acc + itemTotal
    }, 0)

    const price: any = Math.floor(totalPrice)
    return price
}


export async function POST(req: Request) {

    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.error()
    }
    const body = await req.json()

    const { items, payment_id } = body

    const total = CalculateOrderPayment(items) * 100

    const orderData = {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: "BDT",
        status: "pending",
        deliveryStatus: "pending",
        payment_id: payment_id,
        products: items,


    }

    if (payment_id) {
        const current_Intent = await stripe.paymentIntents.retrieve(payment_id)

        if (current_Intent) {
            const updated_intent = await stripe.paymentIntents.update(payment_id, { amount: total })
            const [existing_order, update_order] = await Promise.all([
                prisma.order.findFirst({
                    where: { payment_id: payment_id }

                }),
                prisma.order.update({
                    where: { payment_id: payment_id },
                    data: {
                        amount: total,
                        products: items,
                    }
                })
            ])
            if (!existing_order) {
                return NextResponse.json({ error: "Invalid payment" }, { status: 400 })
            }
            return NextResponse.json({ paymentIntent: updated_intent })
        }

    }
    else {
        //create the intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
            automatic_payment_methods: { enabled: true }
        })
        //create  the order
        orderData.payment_id = paymentIntent.id
        await prisma.order.create({
            data: orderData
        })
        return NextResponse.json({ paymentIntent })
    }

    return NextResponse.error()
}