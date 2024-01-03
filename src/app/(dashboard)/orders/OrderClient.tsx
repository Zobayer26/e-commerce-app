'use client'

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatCurrency } from "@/utils/formatCurrency";
import Heading from "@/components/ProductStyle/Heading";
import Status from "@/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import moment from "moment";
import { FcProcess } from "react-icons/fc";

type OrderClientProps = {
    orders: ExtendedOrder[]
}
type ExtendedOrder = Order & {
    user: User
}

const OrderClientPage: React.FC<OrderClientProps> = ({ orders }) => {


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
            field: 'amount', headerName: "Amount(BDT)", width: 130,
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
                                (<Status text="deliverd" icon={MdDone} bg="bg-green-200 " color="text-green-700" />) :
                                params.row.deliveryStatus === 'processing' ? (
                                    <Status text="processing" icon={FcProcess} bg="bg-purple-200 " color="text-purple-700" />) : <></>}
                </div>
            }
        },
        { field: 'date', headerName: "Date", width: 130 },

    ]


    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title=" Orders " center />
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

export default OrderClientPage;