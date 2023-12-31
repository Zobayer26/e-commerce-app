'use client'

import Button from "@/components/CustomButton";
import Heading from "@/components/ProductStyle/Heading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Iparams = {
    orderId?: string
  }
  
const DeliveryForm :React.FC<Iparams>= ({ orderId }) => {
    const router = useRouter()
    const [checkOtp, setcheckOtp] = useState<string>("")
    const [otp, setOtp] = useState<string>("")
    const [timestamp, setTimestamp] = useState(0)

    const generateotp = async () => {

        let pass = "";
        pass += Math.floor(Math.random() * 10000)
        const time = Date.now()
        setTimestamp(time)
        setOtp(pass)

        await fetch('/api/sendEmail', {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            }, body: JSON.stringify({
                otp: pass,
                orderId: orderId
            })
        })
    }
    const ValidOtp = async (e: any) => {
        e.preventDefault()
        console.log(timestamp)
        const currentTime = Date.now();
        const timeDifference = currentTime - timestamp;


        const isOTPValid = checkOtp == otp && timeDifference <= 60000; // 60000 milliseconds = 1 minute
        if (isOTPValid) {

            await fetch('/api/updateorder', {
                method: "POST",
                headers: {
                    'content-Type': 'application/json'
                }, body: JSON.stringify({
                    orderId:orderId
                })
            })
            router.push('/')
        }
        else {
            toast.error('Invalid otp try again')
        }
    }

    return (
        <div>
            <div className="w-[400px] mt-4 mx-auto"><Heading title="Delivery Validation" /></div>
            <div className="w-[500px] mx-auto bg-orange-300 rounded-md px-10 py-8 mt-10">
                <div className="mx-auto flex flex-col justify-center items-start gap-4">
                    <Button custom="bg-orange-500 hover:bg-orange-300"
                        label="Generate otp" onClick={generateotp} />
                    <form className="flex">
                        <input
                            type="text"
                            className="border p-3"
                            placeholder="Enter otp Here"
                            value={checkOtp}
                            onChange={(e) => setcheckOtp(e.target.value)}
                        />
                        <Button custom="bg-orange-500 hover:bg-orange-30"
                            label="Submit otp" onClick={(e) => ValidOtp(e)} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DeliveryForm;
