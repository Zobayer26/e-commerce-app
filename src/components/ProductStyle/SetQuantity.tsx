import { Cartproduct } from "./ProductDetails";

type quantityProps = {
    cartCounter?: boolean,
    cartProduct: Cartproduct
    handleQuantityIncrease: () => void
    handleQuantityDecrease: () => void
}

const btnStyles = 'border-[1.2px] border-orange-300 px-2  rounded font-semibold text-slate-900'

const SetQuantity: React.FC<quantityProps> = ({
    cartCounter, cartProduct, handleQuantityIncrease, handleQuantityDecrease}) => {
    return (
        <div className="flex gap-8 items-center">
            {
                cartCounter ? null :
                    <div className=" font-semibold ">
                        QUANTITY:
                    </div>
            }
            <div className="flex gap-4 items-center text-base" >
                <button className={btnStyles}
                onClick={handleQuantityDecrease} >-</button>
                <div>
                    {cartProduct.qunatity}
                </div>
                <button  className={btnStyles}
                onClick={handleQuantityIncrease}>+</button>
            </div>
        </div>
    );
};

export default SetQuantity;
  