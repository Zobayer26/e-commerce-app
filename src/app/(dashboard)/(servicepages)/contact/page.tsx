'use client'
// import TextArea from '@/components/Inputs/Textarea';
import Heading from '@/components/ProductStyle/Heading';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form"
const Contact = () => {
    const onSubmit = () => { }
    const form = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: ''
        }
    })
    return (
        <div className=" max-w-[1000px] mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col gap-2 px-4">
                <div className='text-orange-500'><Heading title='Contact us' /></div>
                <p className="xl:max-w-[500px] text-sm">
                    We take the time to understand your unique needs, crafting custom software that aligns perfectly with your goals, resulting in enhanced efficiency and effectiveness.
                </p>

                <div className='max-w-[500px] p-4 rounded-md bg-orange-50'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
                            <div className='space-y-1'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Enter your name"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='space-y-1'>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Enter your email"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='space-y-1'>
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Enter your phone number"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <textarea className='rounded px-2 text-slate-700' placeholder='Enter Your Text here' rows={6}/>
                            <Button className='bg-orange-500 hover:bg-orange-300'> Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div>
                image
            </div>
        </div>

    );
};

export default Contact;
