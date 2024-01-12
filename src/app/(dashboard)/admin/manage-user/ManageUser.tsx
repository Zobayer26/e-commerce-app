'use client'
import Heading from "@/components/ProductStyle/Heading";
import { User } from "@prisma/client";
import Container from "@/components/Container";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { MdDone, MdDelete } from "react-icons/md";
import ActionBtn from "@/components/ActionBtn";

type ManageUserType = {
    user: User[]
}

const ManageUser: React.FC<ManageUserType> = ({ user }) => {

    const router = useRouter()
    const handleUser = async (e: any, userId: string) => {
        e.preventDefault()
        const res = await fetch('/api/approveuser', {
            method: "PUT",
            body: JSON.stringify({
                userId: userId,
                role: "deliveryman"
            })
        })
        if (res.ok) {
            toast.success('Add deliveryman successfuly')
            router.refresh()
        }
        else {
            toast.error('something went wrong. try again')
        }

    }
    let rows: any = []
    if (user) {
        rows = user.map((item) => {
            return {
                id: item.id,
                Customer: item.name,
                email: item.email,
                role: item.role,
                username: item.username


            }
        })
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: "ID", width: 220 },
        { field: 'Customer', headerName: "User Name", width: 200 },
        { field: 'email', headerName: "Email", width: 200 },
        { field: 'username', headerName: "User Name", width: 150 },
        { field: 'role', headerName: "Role", width: 130 },
        {
            field: 'actions', headerName: "Actions", width: 200,
            renderCell: (params) => {
                return <div className=" flex  gap-2 w-full" >

                    <ActionBtn
                        icon={MdDone}
                        onClick={(e) => {
                            handleUser(e, params.row.id)
                        }}
                    />
                    <ActionBtn
                        icon={MdDelete}
                        onClick={() => {
                            handleDelete(params.row.id)
                        }}
                    />
                </div>
            }
        },
    ]
    const handleDelete = async (userId: string) => {
      const res=  await fetch('/api/deleteuser', {
            method: "DELETE",
            body: JSON.stringify({
                userId: userId,
            })
        })
        if (res.ok) {
            toast.success('User delete successfuly')
            router.refresh()
        }
        else {
            toast.error('something went wrong. try again')
        }
    }

    return (
        <Container>
            <div className="mx-auto text-center max-w-[200px] my-4">
                <Heading title="Manage User" />
            </div>
            <div className="max-w-[1150px] m-auto text-xl">
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

        </Container>

    );
};

export default ManageUser;
