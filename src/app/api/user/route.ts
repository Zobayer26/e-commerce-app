import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'

import * as z from 'zod'

const userSchema = z.object({
    name: z.string().min(4, 'Username is required').max(30, 'name must have not more than 30 character'),
    username: z.string().min(4, 'Username is required').max(30, 'username must have not more than 30 character'),
    email: z.string().min(1, 'Email is required').email('invalid email'),
    password: z.string().min(1, 'Password  is required').min(8, 'Password must have than 8 character')
})

export async function GET() {

    return NextResponse.json({ sucess: "works" })
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, username, email, password } = userSchema.parse(body)

        const existingUserEmail = await prisma.user.findUnique({
            where: { email: email }
        })
        if (existingUserEmail) {
            return NextResponse.json({ user: null, message: "user with this email already exist" }, { status: 409 })
        }
        const existingUserName = await prisma.user.findUnique({
            where: { username: username }
        })
        if (existingUserName) {
            return NextResponse.json({ user: null, message: "username already exist try differnt One" }, { status: 409 })
        }
        const hashedPassword = await hash(password, 9)
        const userInfo = await prisma.user.create({
            data: {
                name: name,
                username: username,
                email: email,
                password: hashedPassword
            }
        })

        const { password: newPassword, ...rest } = userInfo
        return NextResponse.json({ user: rest, message: "Succesfully created account" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error, message: "Something went wrong tray again" }, { status: 400 })
    }
}