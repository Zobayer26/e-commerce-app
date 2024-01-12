import getDeliveryman from "@/actions/getDeliveryman";
import ManageDeliveryman from "./ManageDeliveryman";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/admin/NullData";
const page =async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== 'admin') {
    return <NullData title=" Access denied" />
  }
  const deliveryman :any= await getDeliveryman()
    return (
        <div>
          <ManageDeliveryman deliveryman={deliveryman} /> 
        </div>
    );
};

export default page;