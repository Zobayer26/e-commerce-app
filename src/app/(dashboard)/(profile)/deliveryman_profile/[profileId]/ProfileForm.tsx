
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


type ProfileFormProps = {
    userId: string,
}

const FormSchema = z.object({
    status: z.string().min(1, { message: 'Select an option' }),
    jobtype: z.string().min(1, { message: 'Select an option' }),
    phone: z.string().min(11, 'Phone Number is required'),
    contactname: z.string().min(3, 'Contact name required'),
    relation: z.string().min(3, 'Contact person relation required'),
    emergencycontact: z.string().min(11, 'Phone Number is required'),
    area: z.string().min(3, 'area required'),
    nid: z.string().min(10, 'enter your valid nid number')
})
const ProfileForm: React.FC<ProfileFormProps> = ({ userId }) => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            status: '',
            jobtype: '',
            phone: '',
            contactname: '',
            relation: '',
            emergencycontact: '',
            area: '',
            nid: ''

        }
    })
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const res = await fetch('/api/deliverymanprofile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: values.status,
                jobtype: values.jobtype,
                phone: values.phone,
                contactname: values.contactname,
                emergencycontact: values.emergencycontact,
                area: values.area,
                relation: values.relation,
                nid: values.nid,
                userId: userId



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
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status:</FormLabel>
                                    <FormControl>
                                        <select {...field}>
                                            <option value="" disabled>Select an status</option>
                                            <option value="available">available</option>
                                            <option value="unavailable">unavailable</option>

                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="jobtype"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Type:</FormLabel>
                                    <FormControl>
                                        <select {...field}>
                                            <option value="" disabled>Select Job Type</option>
                                            <option value="fulltime">fulltime</option>
                                            <option value="fulltime">partime</option>

                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contactname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Contact Person Name"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="relation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>relation</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Relation Of Emergency Contact Person"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="emergencycontact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Emergency contact</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Emergency Contact Number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>NID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter NID Number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Delivery area</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Delivery Area" {...field} />
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

export default ProfileForm;


