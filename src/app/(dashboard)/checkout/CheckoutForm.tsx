'use client'

import Button from "@/components/CustomButton";
import Heading from "@/components/ProductStyle/Heading";
import { customHooks } from "@/hooks/CustomHooks";
import { formatCurrency } from "@/utils/formatCurrency";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CheckoutFormProps = {

    clientSecret: string,
    handlesetPaymentSuccess: (value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handlesetPaymentSuccess }) => {

    const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = customHooks()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const formattedPrice = formatCurrency(cartTotalAmount)

    useEffect(() => {

        if (!stripe) {
            return
        }
        if (!clientSecret) {
            return
        }

        handlesetPaymentSuccess(false)
    }, [stripe])


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)

        stripe.confirmPayment({
            elements, redirect: "if_required"
        }).then(result => {
            if (!result.error) {
                toast.success('Payment Success')
                handleClearCart()
                handlesetPaymentSuccess(true)
                handleSetPaymentIntent(null)
            }
            setIsLoading(false)
        })

    }

    return (
        <div className="max-w-[400px]  mx-auto">
            <form onSubmit={handleSubmit}
                id="payment-form">
                <div className="mb-6">
                    <Heading title=" Enter Your details to compelete payment" />
                </div>
                <h2 className="text-center font-semibold mb-2">
                    Address Information
                </h2>
                <AddressElement

                    options={{ mode: 'shipping', allowedCountries: ['US', 'BD', 'AFG'] }}
                />
                <h2 className="text-center font-semibold mt-4 mb-2">
                    Payment Information
                </h2>
                <PaymentElement
                    id="payment-element"
                    options={{ layout: 'tabs' }}
                />
                <div className="py-4 text-center text-slate-700 text-2xl font-bold">
                    Total:{formattedPrice}
                </div>
                <Button
                    label={isLoading ? 'Processing' : 'Pay now'}
                    disabled={isLoading || !stripe || !elements}
                    custom="bg-orange-500 hover:bg-orange-300"
                    onClick={() => { }}
                />
            </form>
        </div>
    );
};

export default CheckoutForm;