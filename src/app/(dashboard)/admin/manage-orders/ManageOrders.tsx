'use client'

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatCurrency } from "@/utils/formatCurrency";
import Heading from "@/components/ProductStyle/Heading";
import Status from "@/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/components/ActionBtn";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";

type ManageOrdersProps = {
    orders: ExtendedOrder[]
}
type ExtendedOrder = Order & {
    user: User
}

const ManageOrders: React.FC<ManageOrdersProps> = ({ orders }) => {

    const router = useRouter()

    let rows: any = []
    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                Customer: order.user.name,
                amount: formatCurrency(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            }
        })
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: "ID", width: 220 },
        { field: 'Customer', headerName: "Customer name", width: 130 },
        {
            field: 'amount', headerName: "Amount(USD)", width: 130,
            renderCell: (params) => { return <div className="font-bold text-slate-800">{params.row.amount}</div> }
        },
        {
            field: 'paymentStatus', headerName: "Payment Status", width: 130,
            renderCell: (params) => {
                return <div>
                    {params.row.paymentStatus === 'pending' ?
                        (<Status text="Pending" icon={MdAccessTimeFilled} bg="bg-slate-200 " color="text-slate-700" />)
                        : params.row.paymentStatus === 'complete' ? (
                            <Status text="complete" icon={MdDone} bg="bg-green-200 " color="text-green-700" />) :
                            <></>
                    }
                </div>
            }
        },
        {
            field: 'deliveryStatus', headerName: "Delivery Status", width: 130,
            renderCell: (params) => {
                return <div>
                    {params.row.deliveryStatus === 'pending' ?
                        (<Status text="Pending" icon={MdAccessTimeFilled} bg="bg-slate-200 " color="text-slate-700" />)
                        : params.row.deliveryStatus === 'dispatched' ? (
                            <Status text="dispatched" icon={MdDeliveryDining} bg="bg-purple-200 " color="text-purple-700" />)
                            : params.row.deliveryStatus === 'delivered' ?
                                (<Status text="deliverd" icon={MdDone} bg="bg-green-200 " color="text-green-700" />) : <></>}
                </div>
            }
        },
        { field: 'date', headerName: "Date", width: 130 },
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
                deliveryStatus:"dispatched"
            })
        }).then((res) => {
            toast.success('Order Dispatch')
            router.refresh()
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
                <Heading title="Manage Orders " center />
            </div>
            <div className="h-[600px] w-full">
                <DataGrid
                    rows={rows}
                    columns={columns}
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

export default ManageOrders;