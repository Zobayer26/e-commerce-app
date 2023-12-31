'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from 'react'
import Heading from '@/components/ProductStyle/Heading'



type ShippingFormProps = {
    currentUser: any,
    orderId:string
}

const FormSchema = z.object({
    name: z.string().min(4, 'name is required').max(30, 'name must have not more than 30 character'),
    email: z.string().min(1, 'Email is required').email('invalid email'),
    phone: z.string().min(11, 'Phone Number is required'),
    address: z.string().min(10, 'address required'),
    district: z.string().min(5, 'district required'),
    notes: z.string()
})

const ShippingForm: React.FC<ShippingFormProps> =  ({ currentUser ,orderId}) => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            district: '',
            notes: ''

        }
    })

    useEffect(() => {
        if (!currentUser) {

            router.push('/log-in')
        }
    }, [])
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const res = await fetch('/api/shipping', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                phone: values.phone,
                address: values.address,
                district: values.district,
                notes: values.notes,
                orderId:orderId
                
            })
        })
        console.log(res)
        if (res.ok) {
            toast({
                title: "Congratulations",
                description: "shipping information create successfully!",
                variant: 'default'
            })
            router.push('/')
        } else {
            toast({
                title: "Error",
                description: "Opps! Something went wrong! try again",
                variant: 'destructive'
            })
        }
    }
    if (!currentUser) {
        return <p>
            plz  logged in . Redirecting to log Page..
        </p>
    }


    return (
        <div>
            <div className='my-4'>
                <Heading title=' Shipping Information' />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className='space-y-1'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name"  {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter phone number"  {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="mail@example.com"  {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full address"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>District</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your district "  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Notes about your order , eg special notes for delivery"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="w-full mt-6 text-white bg-orange-500 hover:bg-orange-300" type="submit">submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default ShippingForm;