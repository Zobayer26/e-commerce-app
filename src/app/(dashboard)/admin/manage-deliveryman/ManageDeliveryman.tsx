'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Heading from "@/components/ProductStyle/Heading";

import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/components/ActionBtn";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Deliveryman, User } from "@prisma/client";

type ManageDeliverymanProps = {
    deliveryman: ExtendedDeliveryman[]
}

type ExtendedDeliveryman = Deliveryman & {
    user: User
}

const ManageDeliveryman: React.FC<ManageDeliverymanProps> = ({ deliveryman }) => {

    const router = useRouter()

    let rows: any = []
    if (deliveryman) {
        rows = deliveryman.map((item, index) => {
            return {
                id: item.id,
                Name: item.user.name,
                phone: item.phone,
                jobtype: item.jobtype,
                status: item.status,
                area: item.area,
                nid: item.nid,
                contactname: item.contactname,
                relation: item.relation,
                emergencycontact: item.emargencycontact
            }
        })
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: "ID", width: 120 },
        { field: 'Name', headerName: "Deliveryman name", width: 100 },
        { field: 'phone', headerName: "Phone", width: 100 },
        { field: 'jobtype', headerName: "JobType", width: 100 },
        { field: 'status', headerName: "Status", width: 100 },
        { field: 'area', headerName: "Area", width: 100 },
        { field: 'nid', headerName: "Nid", width: 100 },
        { field: 'contactname', headerName: "Contact name", width: 100 },
        { field: 'emergencycontact', headerName: "Emergency contact", width: 100 },
        { field: 'relation', headerName: "Relation", width: 100 },
        {
            field: 'actions', headerName: "Actions", width: 200,
            renderCell: (params) => {
                return <div className=" flex justify-between gap-4 w-full" >
                    <ActionBtn
                        icon={MdDeliveryDining}
                        onClick={() => {
                            handleDispatch(params.row.id)
                        }}
                    />
                    <ActionBtn
                        icon={MdDone}
                        onClick={() => {
                            handleDelivered(params.row.id)
                        }}
                    />
                    <ActionBtn
                        icon={MdRemoveRedEye}
                        onClick={() => {
                            router.push(`/order/${params.row.id}`)
                        }}
                    />
                </div>
            }
        },
    ]

    const handleDispatch = useCallback((id: string) => {
        fetch('/api/order', {
            method: "PUT",
            body: JSON.stringify({
                id,
                deliveryStatus: "dispatched"
            })
        }).then((res) => {
            toast.success('Order Dispatch')
            router.push(`/admin/assign-delivery/${id}`)
        }).catch((err) => {
            toast.error('Opps! something went Wrong')
            console.log(err)
        })
    }, [])


    const handleDelivered = useCallback((id: string) => {
        fetch('/api/order', {
            method: "PUT",
            body: JSON.stringify({
                id,
                deliveryStatus: "delivered"
            })
        }).then((res) => {
            toast.success('Order Delivered')
            router.refresh()
        }).catch((err) => {
            toast.error('Opps! something went Wrong')
            console.log(err)
        })
    }, [])

    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Deliveryman Information " center />
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
export default ManageDeliveryman







