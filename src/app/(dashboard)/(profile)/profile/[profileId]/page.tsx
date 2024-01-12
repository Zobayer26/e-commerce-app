import UserProfileForm from "./UserProfileForm";

const page = ({ params }: { params: { profileId: string } }) => {
    return (
        <div>
            <UserProfileForm userId={params.profileId} />
        </div>
    );
};

export default page;