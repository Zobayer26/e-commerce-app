'use client'

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatCurrency } from "@/utils/formatCurrency";
import Heading from "@/components/ProductStyle/Heading";
import Status from "@/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/components/ActionBtn";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage"
import firebaseApp from "@/lib/firebase";

type ManageProductsProps = {
    products: Product[]
}

const ManageProducts: React.FC<ManageProductsProps> = ({ products }) => {

    const router = useRouter()
    const storage = getStorage(firebaseApp)
    let rows: any = []
    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatCurrency(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                quantity:product.quantity,
                images: product.images
            }
        })
    }
    const columns: GridColDef[] = [
        { field: 'id', headerName: "ID", width: 220 },
        { field: 'name', headerName: "Name", width: 220 },
        {
            field: 'price', headerName: "Price", width: 100,
            renderCell: (params) => { return <div className="font-bold text-slate-800">{params.row.price}</div> }
        },
        { field: 'category', headerName: "Category", width: 100 },
        { field: 'brand', headerName: "Brand", width: 100 },
        {
            field: 'inStock', headerName: "In Stock", width: 120,
            renderCell: (params) => {
                return <div>
                    {params.row.inStock === true ? <Status text="In Stock"
                        icon={MdDone} bg="bg-teal-200 " color="text-teal-700" /> :
                        <Status text="Out of Stock"
                            icon={MdClose} bg="bg-rose-200 " color="text-rose-700" />}
                </div>
            }
        },
        { field: 'quantity', headerName: "Quantity", width: 100 },
        {
            field: 'actions', headerName: "Actions", width: 200,
            renderCell: (params) => {
                return <div className=" flex justify-between gap-4 w-full" >
                    <ActionBtn
                        icon={MdCached}
                        onClick={() => {
                            handleToggleStock(params.row.id)
                        }}
                    />
                    <ActionBtn
                        icon={MdDelete}
                        onClick={() => {
                            handleDelete(params.row.id, params.row.image)
                        }}
                    />
                    <ActionBtn
                        icon={MdRemoveRedEye}
                        onClick={() => {
                            router.push(`/product/${params.row.id}`)
                         }}
                    />
                </div>
            }
        },
    ]

    const handleToggleStock = useCallback((id: string) => {
        router.push(`/admin/manage-products/update-product/${id}`)
    }, [])


    const handleDelete = useCallback(async (id: string, image: any) => {
        toast('Deleting product , please wait')
        const handleImageDelete = async () => {
            try {
                for (const item of image) {
                    if (item.image) {
                        const imageRef = ref(storage, item.image)
                        await deleteObject(imageRef)
                        console.log("image deleted")
                    }
                }

            } catch (error) {
                return console.log("Deleting image error", error)
            }
        }
        await handleImageDelete()
        await fetch(`/api/product/${id}`).then((res) => {
            toast.success('Product deleted')
            router.refresh()
        }).catch((err) => {
            toast.error('Failed to delete')
            console.log(err)
        })
    }, [])



    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Manage Products " center />
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

export default ManageProducts;