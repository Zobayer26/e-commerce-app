import Heading from "@/components/ProductStyle/Heading";
import { User } from "@prisma/client";
import Container from "@/components/Container";
type ManageUserType = {
    user: User[]
}

const ManageUser: React.FC<ManageUserType> = ({ user }) => {
    return (
        <Container>
            <div className="mx-auto w-[500px] mb-4">
                <Heading title="Verify user as  deliveryman" />
            </div>
            <div className="w-[500px] mx-auto p-2 border border-orange-300">
                {user.map((item) => (
                    <div key={item.id} className="flex gap-2">
                        <h1>{item.name}</h1>
                        <h1>{item.email}</h1>
                        <h1>{item.role}</h1>
                    </div>
                ))}
            </div>

        </Container>

    );
};

export default ManageUser;