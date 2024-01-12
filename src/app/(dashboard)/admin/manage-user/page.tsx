import prisma from "@/lib/prisma";
import ManageUser from "./ManageUser";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/admin/NullData";

const page = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'admin') {
        return <NullData title=" Access denied" />
    }

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