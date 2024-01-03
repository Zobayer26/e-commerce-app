import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { userId, phone, status, jobtype, contactname, relation, emergencycontact, nid, area } = body
        const result = await prisma.deliveryman.create({
            data: {
                userId: userId,
                phone: phone,
                status: status,
                jobtype: jobtype,
                contactname: contactname,
                relation: relation,
                emargencycontact: emergencycontact,
                nid: nid,
                area: area
            }
        })
        return NextResponse.json({ message: "account create succesfully" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error occurd during create account" })
    }

}