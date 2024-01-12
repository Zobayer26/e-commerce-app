import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import Heading from "@/components/ProductStyle/Heading";
import prisma from "@/lib/prisma";
import EditButton from "./EditButton";
import NullData from "@/components/admin/NullData";

const page = async () => {
    const currentUser: any = await getCurrentUser()
    if(!currentUser){
        return <NullData title="Please log in first"/>
    }
    const profileInfo: any = await prisma.profile.findUnique({
        where: {
            userId: currentUser.id
        }
    })
    return (
        <Container>
            <div className="flex flex-col gap-4">
                <div className="w-[300px] flex flex-col gap-2 mx-auto">
                    <Heading title={currentUser?.name} />
                    <EditButton profileId={currentUser.id} />
                </div>
                <div className="w-[800px] mx-auto bg-slate-100 px-10 py-4">
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">Phone:</p>
                        <p>{profileInfo?.phone} </p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">Email:</p>
                        <p>{currentUser.email} </p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">Username:</p>
                        <p>{currentUser.username}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">Address:</p>
                        <p>{profileInfo?.Address}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">Gender:</p>
                        <p>{profileInfo?.Gender}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">birthdate:</p>
                        <p>{profileInfo?.birthdate}</p>
                    </div>
                    <div>
                    <p className="font-semibold">Bio:</p>
                        <div className=" mb-2 w-[300px] min-h-[200px] border
                        border-orange-300 rounded
                        bg-white">
                            {profileInfo?.Bio}
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    );
};

export default page;