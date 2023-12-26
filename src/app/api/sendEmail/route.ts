import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

import nodemailer from 'nodemailer'

export async function POST(req: Request) {

    try {
        const username = process.env.NEXT_PUBLIC_EMAIL_USER
        const pass = process.env.NEXT_PUBLIC_EMAIL_PASSWORD
        const body = await req.json()
        const { otp, orderId } = body
        const user = await prisma.order.findUnique({
            where: {
                id: orderId
            },
            select: { user: true }
        })
        const receiver = user?.user.email;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: username,
                pass: pass
            }
        })
        const mailOptions = {
            from: 'zobayerarif126@gmail.com',
            to: '20103212@iubat.edu',//receiver
            subject: 'OTP',
            text: otp,
        }
        console.log(orderId)
        await transporter.sendMail(mailOptions)
        return NextResponse.json({ success: true }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, message: "email sent failed" }, { status: 500 })
    }
}