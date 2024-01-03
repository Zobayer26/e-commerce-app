'use client'


import Button from "@/components/CustomButton";
import Heading from "@/components/ProductStyle/Heading";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import ItemContent from "./ItemContent";
import { formatCurrency } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";


type CartClientProps = {
    currentUser: any
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {

    const router = useRouter()
    const { cartProducts, handleClearCart, cartTotalAmount } = useCart()
    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl text-orange-500 ">Your cart is empty
                </div>
                <div>
                    <Link href={"/"}
                        className="text-slate-500 flex items-center  gap-1 mt-2">
                        <MdArrowBack className="text-orange-500" size={20} />
                        <span>Start Shooping </span>
                    </Link>
                </div>
            </div>
        )
    }
    return (
        <div>
           <div className="text-orange-500"> <Heading title="Shopping Cart" center /></div>
            <div className="grid grid-cols-5 text-sm gap-4 pb-2
                 mt-8 item-center">
                <div className="col-span-2 justify-self-start">
                    Product
                </div>
                <div className="justify-self-center">
                    Price
                </div>
                <div className="justify-self-center">
                    Quantity
                </div>
                <div className="justify-self-end">
                    Total
                </div>
            </div>
            <div>
                {
                    cartProducts && cartProducts.map((item) => (
                        <ItemContent key={item.id} item={item} />
                    ))
                }
            </div>
            <div className="border-t[1.5px] border-slate-200
           py-4 flex justify-between gap-4">
                <div className="w-[90px]">
                    <Button
                        custom="bg-orange-500 text-white"
                        label="Clear Cart" onClick={() => {
                            handleClearCart()
                        }}
                        small outline />
                </div>
                <div className="text-sm flex flex-col items-start 
                          gap-1 ">
                    <div className="flex justify-between
                        w-full  text-base  font-semibold">
                        <span> SubTotal </span>
                        <span> {formatCurrency(cartTotalAmount)} </span>
                    </div>
                    <p className="text-slate-500">
                        Taxes and Shipping calculate at checkout
                    </p>
                    <Button label={currentUser ? "Checkout" : " Log in to checkout"}
                        custom="bg-orange-500 text-white"
                        outline={currentUser ? false : true}
                        onClick={() => {
                            currentUser ? router.push('/shipping') : router.push('/log-in')
                        }} />
                    <Link href="/"
                        className=" flex items-center gap-1" >
                        <MdArrowBack className="text-orange-500" size={20} />
                        <span className="text-slate-500">Continue Shopping</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartClient;