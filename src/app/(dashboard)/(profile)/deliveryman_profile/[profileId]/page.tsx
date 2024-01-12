import ProfileForm from "./ProfileForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/admin/NullData";

const page = async ({params}:{params:{profileId:string}}) => {
    const currentUser = await getCurrentUser()


    if (currentUser?.role !== 'deliveryman') {
        return <div>
            <NullData title="Please Log in First"
                custom text="Aren't a deliveryman? want to be a deliveryman?" value="contact with admin" />
        </div>
    }

    return (
        <div>
            <ProfileForm userId={params.profileId}/>
        </div>
    );
};

export default page;