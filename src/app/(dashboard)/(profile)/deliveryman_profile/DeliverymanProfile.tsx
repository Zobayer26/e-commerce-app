'use client'

import { useRouter } from "next/navigation";
type DeliverymanProfileType = {
    id: any
}

const DeliverymanProfile: React.FC<DeliverymanProfileType> = ({ id }) => {
    const router = useRouter()
    return (
        <div className=" bg-orange-500 hover:bg-orange-300 transition-colors
       text-white rounded-md border text-center px-2 py-1 mt-4 max-w-[150px]"
            onClick={() => router.push(`/deliveryman_profile/${id}`)}>
            Edit Details
        </div>
    );
};

export default DeliverymanProfile;