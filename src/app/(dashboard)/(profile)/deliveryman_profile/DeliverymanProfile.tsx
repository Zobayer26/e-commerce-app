'use client'

import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa";
type DeliverymanProfileType = {
    id: any
}

const DeliverymanProfile: React.FC<DeliverymanProfileType> = ({ id }) => {
    const router = useRouter()
    return (
        <div className=" bg-orange-500 hover:bg-orange-300 transition-colors flex items-center gap-1
       text-white rounded-md border text-center px-2 py-1 mt-4 max-w-[130px]"
            onClick={() => router.push(`/deliveryman_profile/${id}`)}>
            <FaPen />
            <h1>Edit Details</h1>
        </div>
    );
};

export default DeliverymanProfile;