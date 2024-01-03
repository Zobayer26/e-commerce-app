'use client'

import { Cartproduct } from "@/components/ProductStyle/ProductDetails";
import SetQuantity from "@/components/ProductStyle/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import Link from "next/link";

type ItemContenType = {

    item: Cartproduct
}

const ItemContent: React.FC<ItemContenType> = ({ item }) => {
    const { handleRemoveProducttoCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart()
    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] 
        border-slate-200 py-4 items-center ">
            <div className="col-span-2 flex justify-self-start 
            gap-2 md:gap-4">
                <Link href={`/product/${item.id}`}>
                    <div className=" relative w-[70px] aspect-square">
                        <Image src={item.selectedImg.image} alt={item.name} fill
                            className="object-contain" />
                    </div>
                </Link>
                <div className="flex flex-col justify-between ">
                    <Link href={`/product/${item.id}`}>
                        {truncateText(item.name)}
                    </Link>
                    < div>{item.selectedImg.color} </div>
                    <div className="w-[70px]">
                        <button onClick={() =>
                            handleRemoveProducttoCart(item)
                        }
                            className="text-slate-500 underline">
                            remove
                        </button>
                    </div>
                </div>
            </div>
            <div className="justify-self-center font-semibold">{formatCurrency(item.price)}</div>
            <div className="justify-self-center">
                <SetQuantity cartCounter={true}
                    cartProduct={item}
                    handleQuantityIncrease={() => {
                        handleCartQtyIncrease(item)
                    }}
                    handleQuantityDecrease={() => {
                        handleCartQtyDecrease(item)
                    }}
                />
            </div>
            <div className="justify-self-end font-semibold">
                {formatCurrency(item.price * item.qunatity)}
            </div>

        </div>
    );
};

export default ItemContent;