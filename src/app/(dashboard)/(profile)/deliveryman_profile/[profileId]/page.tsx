import ProfileForm from "./ProfileForm";


const page = ({params}:{params:{profileId:string}}) => {
    console.log(params.profileId)
    return (
        <div>
            <ProfileForm userId={params.profileId}/>
        </div>
    );
};

export default page;