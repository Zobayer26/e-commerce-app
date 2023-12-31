import Container from "@/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/admin/NullData";
import ManageOrders from "./ManageOrders";
import { getOrders } from "@/actions/getOrders";

const ManageOrderPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role === 'user') {
    return <NullData title=" Access denied" />
  }
  const orders :any=await getOrders()
  return (
    <div className="pt-8">
      <Container>
        <ManageOrders orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrderPage;