'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import Heading from '@/components/ProductStyle/Heading'

type UserProfileFormtype = {
    userId: string,
}

const FormSchema = z.object({
    phone: z.string().min(11, 'Phone Number is required'),
    Address: z.string(),
    Bio: z.string(),
    Gender: z.string()
})

const UserProfileForm: React.FC<UserProfileFormtype> = ({ userId }) => {

    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            phone: '',
            Address: '',
            Gender: '',
            Bio: ''
        }
    })
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const res = await fetch('/api/userProfileDetails', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: values.phone,
                Address:values.Address,
                Gender:values.Gender,
                Bio:values.Bio,
                profileId: userId,
                
            })
        })
        if (res.ok) {
            toast({
                title: "Congratulations",
                description: "Information create successfully!",
                variant: 'default'
            })
            router.push('/deliveryman_profile')
        } else {
            toast({
                title: "Error",
                description: "Opps! Something went wrong! try again",
                variant: 'destructive'
            })
        }
    }


    return (
        <div className="w-[500px] mx-auto">
            <div className='my-4'>
                <Heading title=' Profile Information' />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className='space-y-1'>
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Phone Number"  {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adddress</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Address"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender: </FormLabel>
                                    <FormControl>
                                        <select {...field}>
                                            <option value="" >Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Bio"  {...field} />
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

export default UserProfileForm;




