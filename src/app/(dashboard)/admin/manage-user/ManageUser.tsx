'use client'
import Heading from "@/components/ProductStyle/Heading";
import { User } from "@prisma/client";
import Container from "@/components/Container";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
type ManageUserType = {
    user: User[]
}

const ManageUser: React.FC<ManageUserType> = ({ user }) => {
    const router = useRouter()
    const [email, setemail] = useState("")

    const handleUser = async (e: any, userId: string) => {
        e.preventDefault()
        const res = await fetch('/api/approveuser', {
            method: "PUT",
            body: JSON.stringify({
                userId: userId,
                role: "deliveryman"
            })
        })
        if (res.ok) {
            toast.success('Approve deliveryman successfuly')
            router.refresh()
        }
        else {
            toast.error('failed to approve')
        }

    }
    const handlesubmit = (e: any) => {
        e.preventDefault()
        alert(email)

    }
    return (
        <Container>
            <div className="mx-auto w-[500px] my-4">
                <Heading title="Verify user as  deliveryman" />
                <div>
                    <form className="flex gap-1 " onSubmit={handlesubmit}>
                        <input className="border border-orange-200 rounded-md px-2 py-1"
                            value={email} onChange={(e) => setemail(e.target.value)}
                            type="email" required placeholder="Search by email" />
                        <button className="border px-2 rounded-md bg-orange-500 text-white
                         hover:bg-orange-300 transition-colors">< FaSearch /></button>
                    </form>
                </div>
            </div>
            <div className="w-[500px] mx-auto p-2 border border-orange-300">
                {user.map((item) => (
                    <div key={item.id} className="flex gap-4">
                        <h1>{item.name}</h1>
                        <h1>{item.email}</h1>
                        <div>
                            <button onClick={(e) => {
                                handleUser(e, item.id)
                            }}
                                className="border bg-orange-500 text-white
                             hover:bg-orange-300 transitions-colors px-2">{item.role}</button>
                        </div>
                    </div>
                ))}
            </div>

        </Container>

    );
};

export default ManageUser;