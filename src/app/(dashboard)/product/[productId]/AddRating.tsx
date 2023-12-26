'use client'

import Button from "@/components/CustomButton";
import Heading from "@/components/ProductStyle/Heading";
import { SafeUser } from "@/types";
import { Rating } from '@mui/material'
import Input from "@/components/Inputs/Input";
import { Order, Product, Review } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from 'axios';

type AddRatingProps = {
    product: Product & {
        reviews: Review[]
    },
    user: (SafeUser & {
        orders: Order[]
    }) | null
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {


    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0,
        }
    })

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }
    const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
        setIsLoading(true)
        console.log(data)
        if (data.rating === 0) {
            setIsLoading(false)
            return toast.error('No Rating selected')
        }
        const ratingData = { ...data, userId: user?.id, productId: product.id }
        axios.post('/api/addRa', ratingData).then(() => {
            toast.success('Rating Submitted')
            router.refresh();
            reset()
        }).catch((error: any) => {
            console.log(error)
            toast.error('something went wrong')
        }).finally(() => {
            setIsLoading(false)
        })

    }
    // if (!user || !product) return null

    // const deliveredOrder = user?.orders.some(order: any => order.products.find(
    //     item => item.id === product.id) && order.deliveryStatus === 'delivered')

    // const userReview = product?.reviews.find(((review: Review) => {
    //     return review.userId === user.id
    // }))
    // if (userReview || !deliveredOrder) return null


    return (
        <div className="flex flex-col gap-2 max-w-[500px]">
            <Heading title="Rate this product" />
            <Rating
                onChange={(event, newValue) => {
                    setCustomValue('rating', newValue)
                }} />
            <Input id='comment'
                label='Comment'
                disabled={isLoading}
                register={register}
                errors={errors}
                required />

            <div className="max-w-[200px]">
                <Button
                    custom="bg-orange-500 hover:bg-orange-300"
                    label={isLoading ? "Loading" : "Rate Product"} onClick={handleSubmit(onSubmit)} />
            </div>
        </div>
    );
};

export default AddRating;