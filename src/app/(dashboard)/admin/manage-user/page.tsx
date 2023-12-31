import prisma from "@/lib/prisma";
import ManageUser from "./ManageUser";

const page = async () => {
    const userRole = await prisma.user.findMany({
        where: {
            role: 'user'
        }
    })
    return (
        <div>
            <ManageUser user={userRole} />
        </div>
    );
};

export default page;