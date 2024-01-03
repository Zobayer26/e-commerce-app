'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Heading from "@/components/ProductStyle/Heading";

import { MdDeliveryDining} from "react-icons/md";
import ActionBtn from "@/components/ActionBtn";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DeliverOrder } from "@prisma/client";

type ManageDeliverOrderProps = {
    deliveryinfo: DeliverOrder[]
}


const ManageDeliverOrder: React.FC<ManageDeliverOrderProps> = ({ deliveryinfo }) => {

    const router = useRouter()
    let rows:any = []
    if (deliveryinfo) {
        rows = deliveryinfo.map((item) => {
            return {
                id:item.id,
                orderId: item.orderId,
                deliverymanId: item.deliverymanId,
                customername: item.customername,
                phone: item.phone,
                area: item.district,
                address: item.address,
                contactphone: item.customerphone,
                notes: item.notes,
            }
        })
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: "ID", width: 120 },
        { field: 'orderId', headerName: "Order id", width: 100 },
        { field: 'deliverymanId', headerName: "Deliveryman Id", width: 100 },
        { field: 'customername', headerName: "Customer name", width: 100 },
        { field: 'phone', headerName: "Phone", width: 100 },
        { field: 'area', headerName: "Area", width: 100 },
        { field: 'address', headerName: "Address", width: 100 },
        { field: 'contactphone', headerName: "Customer phone", width: 100 },
        { field: ' notes', headerName: "Notes", width: 100 },
        {
            field: 'actions', headerName: "Actions", width: 200,
            renderCell: (params) => {
                return <div className=" flex justify-between gap-4 w-full" >
                    <ActionBtn
                        icon={MdDeliveryDining}
                        onClick={() => {
                            handleDeliver(params.row.orderId)
                        }}
                    />

                </div>
            }
        },
    ]
    const handleDeliver = useCallback((orderId: string) => {
        toast.success('Order Dispatch')
        router.push(`/valid/${orderId}`)
    }, [])

    return (
        <div className="max-w-[1450px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Deliver Order " center />
            </div>
            <div className="h-[600px] w-full">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row) => row.id}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 9 },
                        },
                    }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>

        </div>
    );
};
export default ManageDeliverOrder 


