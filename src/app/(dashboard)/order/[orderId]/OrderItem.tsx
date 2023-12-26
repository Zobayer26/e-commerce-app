import { formatCurrency } from "@/utils/formatCurrency";
import { truncateText } from "@/utils/truncateText";
import { CartProduct } from "@prisma/client";
import Image from "next/image";

type OrderItemProps = {
    item: CartProduct
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
    return (
        <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-top-[1.5px]
             border-slate-200 py-4 items-center ">
            <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
                <div className=" relative">
                    <Image src={item.selectedImg.image} alt={item.name}
                        width={70} height={40} />
                </div>
                <div className="flex flex-col gap-2">
                    <div> {truncateText(item.name)} </div>
                    <div>{item.selectedImg.color} </div>
                </div>
            </div>
            <div className="justify-self-center">{formatCurrency(item.price)} </div>
            <div className="justify-self-center">{item.qunatity} </div>
            <div className="justify-self-end font-semibold">{(item.qunatity * item.price).toFixed(2)} </div>
        </div>
    );
};

export default OrderItem;