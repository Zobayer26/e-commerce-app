
import { getCurrentUser } from "@/actions/getCurrentUser";
import Heading from "@/components/ProductStyle/Heading";
import DeliverymanProfile from "./DeliverymanProfile";
import NullData from "@/components/admin/NullData";
const page = async () => {

    const currentUser = await getCurrentUser()


    if (currentUser?.role !== 'deliveryman') {
        return <div>
            <NullData title="Please Log in First"
                custom text="Aren't a deliveryman? want to be a deliveryman?" value="contact with admin"/>
        </div>
    }
    return (
        <div className="max-w-[500px] mx-auto">
            <Heading title="Profile" />
            <div className=" bg-slate-200 gap-1 px-4 py-2 flex flex-col">
                <h1>Name:</h1>
                <h1>Email:</h1>
                <h1>Emergency contact:</h1>
                <h1>  jobtype</h1>
                <h1> status</h1>
                <h1> phone</h1>
                <h1> contactname</h1>
                <h1>  relation</h1>
            </div>
            <DeliverymanProfile id={currentUser?.id} />
        </div>
    );
};

export default page;