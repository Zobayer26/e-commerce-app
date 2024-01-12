'use client'

import { useRouter } from "next/navigation";
import { FaPen } from "react-icons/fa";
type EditButtontype = {
    profileId: string
}

const EditButton: React.FC<EditButtontype> = ({ profileId }) => {
    const router = useRouter()
    return (
        <div
            onClick={() => router.push(`/profile/${profileId}`)}
            className=" w-[130px] rounded px-2 py-1 flex gap-2 text-white transition-colors
                    bg-orange-500 items-center ml-[30px] cursor-pointer border hover:bg-orange-300 ">
            <FaPen />
            <h1>Edit profile</h1>
        </div>
    );
};

export default EditButton;