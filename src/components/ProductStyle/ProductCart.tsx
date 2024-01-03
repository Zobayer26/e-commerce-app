'use client'
import { Rating } from '@mui/material'
import { formatCurrency } from "@/utils/formatCurrency";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa"
import { useCart } from "@/hooks/useCart";
import { useCallback, useEffect, useState } from "react";
interface ProductCartProps {
    data: any
}
const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
    const [value, setValue] = useState(1)

    // const { handleCartQtyIncrease, handleCartQtyDecrease } = customHooks()
    const router = useRouter()
    // const [isProductInCart, setisProductInCart] = useState(false)
    // const handleCartQtyIncrease = () => {
        
    //     // setValue()
    // }
    // const handleCartQtyDecrease=()=>{}

    return (
        <div className=' col-span-1  cursor-pointer border-[1.2px] shadow-md bg-slate-50  border-slate-100 
         text-center text-sm'>
            <div className="mt-1">
                <div onClick={() => router.push(`/product/${data.id}`)}
                    className='aspect-square overflow-hidden relative w-[200px] h-[150px] transition hover:scale-105'>
                    <Image src={data.images[0].image} alt={data.name} fill className=" w-full h-full object-contain" />
                </div>
                <div>
                    <div>
                        <div className='mt-2 text-xs'>
                            {truncateText(data.name)}
                        </div>
                        <div>
                            <Rating value={null} name='read-only' size='small' />
                        </div>
                        <div className="text-xs">{data.reviews.length} reviews</div>
                        <div className="font-semibold">{formatCurrency(data.price)}</div>
                        <div>available:{data.quantity}</div>
                    </div>
                    {/* <div className=' rounded-full bg-slate-200 border px-1 py-1 flex items-center
                                      mx-auto justify-between max-w-[120px] mb-1'>
                        <div onClick={() => handleCartQtyDecrease}
                            className='w-6 h-6 rounded-full border flex items-center justify-center bg-white'><FaMinus size={8} /></div>
                        <div className="">{value}</div>
                        <div onClick={() => handleCartQtyIncrease}
                            className='w-6 h-6 rounded-full border flex items-center justify-center bg-white'><FaPlus size={8} /></div>


                    </div>
                    <div className='mb-1 p-1 flex justify-center items-center gap-4'>
                        <div><FaHeart className="text-orange-500 hover:text-orange-300 transition-colors duration-300 ease-in-out"
                            size={25} /></div>
                        {isProductInCart ? <button>view cart</button> :
                            <button>
                                <FaShoppingCart className="text-orange-500 hover:text-orange-300  
                                        transition-colors duration-300 ease-in-out" size={25} />
                            </button>}
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ProductCart;
