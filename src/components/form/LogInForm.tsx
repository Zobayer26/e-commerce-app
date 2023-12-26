'use client'


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from 'react'

type currentUserProps = {
    currentUser: any
}

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('invalid email'),
    password: z.string().min(1, 'Password  is required').min(8, 'Password must have than 8 character')
})


const SignInForm: React.FC<currentUserProps> = ({ currentUser }) => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema)
    })

    useEffect(() => {
        if (currentUser) {
            router.push('/')
            router.refresh()
        }
    }, [])
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const signInData = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false

        })
        if (signInData?.error) {
            toast({
                title: "Erroe",
                description: "Opps! Something went wrong!",
                variant: 'destructive'
            })
        } else {

            router.push('/')
            router.refresh()
        }
    }
    if (currentUser) {
        return <p>
            Already Loged in . Redirecting to Home Page..
        </p>
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className='space-y-2'>
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your password" type="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button className="w-full mt-6" type="submit">Sign in</Button>

            </form>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly
            before:mr-4 before:block before:h-px before:flex-grow
            before:bg-stone-400 after:ml-4 after:block after:h-px
            after:flex-grow after:bg-stone-400'>or
            </div>
            <p className='text-center text-sm text-gray-600 mt-2
            '> Dont &apos;t have an account ? ,please&nbsp;
                <Link className='text-blue-500 hover:underline' href="/register">Sign up</Link>
            </p>
        </Form>
    );
};

export default SignInForm;