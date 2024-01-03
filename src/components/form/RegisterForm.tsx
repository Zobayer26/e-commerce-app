'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from 'react'


type RegisterFormProps = {
    currentUser: any
}

const FormSchema = z.object({
    name: z.string().min(4, 'name is required').max(30, 'name must have not more than 30 character'),
    username: z.string().min(4, 'Username is required').max(30, 'username must have not more than 30 character'),
    email: z.string().min(1, 'Email is required').email('invalid email'),
    password: z.string().min(1, 'Password  is required').min(8, 'Password must have more than 8 character'),
    confirmPassword: z.string().min(1, 'password confirmation is required')
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'password do not match'
})

const SignUpForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    useEffect(() => {
        if (currentUser) {
            router.push('/')
            router.refresh()
        }
    }, [])
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const res = await fetch('/api/user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                username: values.username,
                email: values.email,
                password: values.password
            })
        })
        if (res.ok) {
            toast({
                title: "Congratulations",
                description: "account create successfully!",
                variant: 'default'
            })
            router.push('/log-in')
        } else {
            toast({
                title: "Error",
                description: "Opps! Something went wrong!",
                variant: 'destructive'
            })
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
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your user name"  {...field} />
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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Re-Enter your password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Re-Enter your password" type="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button className="w-full mt-6" type="submit">Sign up</Button>
            </form>
            <div className='mx-auto my-4 flex w-full items-center justify-evenly
            before:mr-4 before:block before:h-px before:flex-grow
            before:bg-stone-400 after:ml-4 after:block after:h-px
            after:flex-grow after:bg-stone-400'>or
            </div>
            <p className='text-center text-sm text-gray-600 mt-2
            '> Already have an account , please&nbsp;
                <Link className='text-blue-500 hover:underline' href="/log-in">Sign in</Link>
            </p>
        </Form>
    );
};

export default SignUpForm;