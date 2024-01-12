
import { getCurrentUser } from "@/actions/getCurrentUser";
import Heading from "@/components/ProductStyle/Heading";
import DeliverymanProfile from "./DeliverymanProfile";
import NullData from "@/components/admin/NullData";
import Container from "@/components/Container";
import prisma from "@/lib/prisma";

const page = async () => {

    const currentUser = await getCurrentUser()


    if (currentUser?.role !== 'deliveryman') {
        return <div>
            <NullData title="Please Log in First"
                custom text="Aren't a deliveryman? want to be a deliveryman?" value="contact with admin" />
        </div>
    }

    const deiverymanInfo = await prisma.deliveryman.findUnique({
        where: {
            userId: currentUser.id
        }
    })
    return (
        <Container>
            <div className="flex flex-col gap-4">
                <div className=" w-[200px] mx-auto flex flex-col">
                    <Heading title={currentUser.name} />
                    <DeliverymanProfile id={currentUser?.id} />
                </div>
                <div className=" bg-slate-100 gap-1 px-10 py-4 flex flex-col w-[800px] mx-auto">
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">Email:</p>
                        <p>{currentUser.email}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">phone:</p>
                        <p>{deiverymanInfo?.phone}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">NID:</p>
                        <p>{deiverymanInfo?.nid}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">Area:</p>
                        <p>{deiverymanInfo?.area}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">contactname:</p>
                        <p>{deiverymanInfo?.contactname}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">Emergency contact:</p>
                        <p>{deiverymanInfo?.emargencycontact}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">relation:</p>
                        <p>{deiverymanInfo?.relation}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">jobtype:</p>
                        <p>{deiverymanInfo?.jobtype}</p>
                    </div>
                    <div className="flex gap-4 text-lg">
                        <p className="font-semibold">status:</p>
                        <p>{deiverymanInfo?.status}</p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default page;