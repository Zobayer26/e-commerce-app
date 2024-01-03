import getDeliveryman from "@/actions/getDeliveryman";
import ManageDeliveryman from "./ManageDeliveryman";


const page =async () => {
  const deliveryman :any= await getDeliveryman()
    return (
        <div>
          <ManageDeliveryman deliveryman={deliveryman} /> 
        </div>
    );
};

export default page;