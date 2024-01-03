'use client'

import { usePathname, useRouter } from "next/navigation";
import Heading from "../ProductStyle/Heading";



const ReturnNav = () => {
    const pathName = usePathname()
    const router = useRouter()
    console.log(pathName)
    return (
        <div>
            <div className=" py-4 border-b-2 border-orange-300 mb-2">
                <Heading title="Return & Refunds" />
            </div>
            <div className=" mx-auto flex flex-col md:flex-row gap-2 ">
                <div onClick={() => router.push('/returns')}
                    className={`px-16 py-2 shadow-sm text-center rounded-md cursor-pointer 
                 ${pathName == '/returns' ? 'bg-orange-500 text-white' : 'bg-slate-200'}`} >How to Return a Product</div>

                <div onClick={() => router.push('/returns/returns-policy')}
                    className={`px-16 py-2 shadow-sm text-center rounded-md cursor-pointer 
                 ${pathName == '/returns/returns-policy' ? 'bg-orange-500 text-white' : 'bg-slate-200'}`} >Returns Policy</div>

                <div onClick={() => router.push('/returns/refund-policy')}
                    className={`px-16 py-2 shadow-sm text-center rounded-md cursor-pointer 
                 ${pathName == '/returns/refund-policy' ? 'bg-orange-500 text-white' : 'bg-slate-200'}`} >Refunds Policy</div>
            </div>
        </div>
    );
};

export default ReturnNav;