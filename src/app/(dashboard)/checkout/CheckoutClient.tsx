'use client'

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm";
import Button from "@/components/CustomButton";



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const CheckoutClient = () => {

    const router = useRouter()
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
    const [clientSecret, setClientSecret] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [paymentSuccess, setpaymentSuccess] = useState(false)
    const [paymentId, setpaymentId] = useState('')
    useEffect(() => {
        if (cartProducts) {
            setLoading(true)
            setError(false)
            fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_id: paymentIntent
                })
            }).then((res) => {
                setLoading(false)
                if (res.status === 401) {
                    return router.push('/log-in')
                }
                return res.json()
            }).then((data) => {
                setClientSecret(data.paymentIntent.client_secret)
                handleSetPaymentIntent(data.paymentIntent.id)
                setpaymentId(data.paymentIntent.id)
            }).catch((error: any) => {
                setError(true)
                console.log(error)
                toast.error('something went wrong!')
            })

        }
    }, [cartProducts, paymentIntent])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
            labels: 'floating'
        }
    }

    const handlesetPaymentSuccess = useCallback((value: boolean) => {
        setpaymentSuccess(value)
    }, [])

    return (
        <div className="w-full ">
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm
                        clientSecret={clientSecret}
                        handlesetPaymentSuccess={handlesetPaymentSuccess}
                    />
                </Elements>
            )}

            {
                loading &&
                <div className="text-center ">
                    Loading Checkout...
                </div>
            }

            {
                error && <div className="text-center text-rose-500">
                    Something went Wrong
                </div>
            }
            {
                paymentSuccess &&
                <div className="flex items-center flex-col gap-4">
                    <div className="text-teal-500 ">Payment Success</div>
                    <div>please add shipping details</div>
                    <div className="max-w-[220px] w-full">
                        <Button label="add shipping details"
                            custom="bg-orange-500 hover:bg-orange-300"
                            onClick={() => router.push(`/shipping/${paymentId}`)} />
                    </div>
                </div>
            }
        </div>
    );
};

export default CheckoutClient;