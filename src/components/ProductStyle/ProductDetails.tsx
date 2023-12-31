'use client'

import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SetColor from "./SetColor";
import SetQuantity from "./SetQuantity";
import Button from "../CustomButton";
import ProductImage from "./ProductImage";
import { useCart} from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


type singleProductprops = {
    product: any
}

export type Cartproduct = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: selectedImgType
    qunatity: number,
    price: number
}

export type selectedImgType = {
    color: string,
    colorCode: string,
    image: string
}
const Horizontal = () => {
    return < hr className="w-[30%]  my-2" />
}

const ProductDetails: React.FC<singleProductprops> = ({ product }) => {
    const qq = product.quantity
    const router = useRouter()
    const { handleAddProductToCart, cartProducts } = useCart()
    const [isProductInCart, setisProductInCart] = useState(false)
    const [cartProduct, setCartProduct] = useState<Cartproduct>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: { ...product.images[0] },
        qunatity: 1,
        price: product.price
    })
    console.log(cartProducts)
    useEffect(() => {
        setisProductInCart(false)
        if (cartProducts) {

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if (existingIndex > -1) {
                setisProductInCart(true)
            }
        }
    }, [cartProducts])
    const productRating = product.reviews.reduce((acc: number, item: any) =>
        item.rating + acc, 0) / product.reviews.length

    const handleColorSelect = useCallback((value: selectedImgType) => {

        setCartProduct((prev) => {
            return { ...prev, selectedImg: value }
        })
    }, [cartProduct.selectedImg])

    const handleQuantityDecrease = useCallback(() => {

        if (cartProduct.qunatity === 1) {
            return
        }
        setCartProduct((prev) => {
            return { ...prev, qunatity: prev.qunatity-- }
        })
    }, [cartProduct])

    const handleQuantityIncrease = useCallback(() => {
        if (cartProduct.qunatity >= qq) {
            toast.error('maximum reached!')
            return
        }
        setCartProduct((prev) => {
            return { ...prev, qunatity: prev.qunatity++ }
        })
    }, [cartProduct])

    console.log(cartProduct)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 
      gap-12  ">
            <ProductImage
                cartproduct={cartProduct}
                product={product}
                handleColorSelect={handleColorSelect}
            />
            <div className="flex flex-col gap-1 text-slate-500 text-sm ">
                <h2 className="text-2xl text-justify font-medium text-slate-700 ">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly />
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal />
                <div className=" text-xs text-justify">
                    {product.description}
                </div>
                <Horizontal />
                <div>
                    <span className="font-semibold">CATEGORY : </span>
                    {product.category}
                </div>
                <div>
                    <span className="font-semibold">BRAND : </span>
                    {product.brand}
                </div>
                <div className="flex gap-1 ">
                    <span className="font-semibold">STATUS : </span>
                    <div className={product.inStock ?
                        'text-orange-400' : 'text-red-500'}>
                        {product.inStock ? 'In Stock' : 'Out of stock'}
                    </div>

                </div>
                <Horizontal />

                {qq <= 0 ? <>
                <div>not availabe</div>
                </> :
                    <>
                        {isProductInCart ? <>
                            <p className="  mb-2 text-slate-500 flex items-center gap-1">
                                <MdCheckCircle className="text-orange-400" size={20} />
                                <span>Product added to Cart  </span>
                            </p>
                            <div className="max-w-[300px]">
                                <Button
                                    custom="bg-orange-500 text-white"
                                    label="View Cart" outline onClick={() => {
                                        router.push('/cart')
                                    }} />
                            </div>
                        </> :
                            <>
                                {product.inStock ? <> <div>
                                    <SetColor
                                        cartProduct={cartProduct}
                                        images={product.images}
                                        handleColorSelect={handleColorSelect}
                                    />
                                </div>
                                    <Horizontal />
                                    <div>
                                        <SetQuantity
                                            cartProduct={cartProduct}
                                            handleQuantityDecrease={handleQuantityDecrease}
                                            handleQuantityIncrease={handleQuantityIncrease}
                                        />
                                    </div>
                                    <Horizontal />
                                    <div className=" max-w-[300px]">
                                        <Button
                                            custom="bg-orange-500"
                                            label="Add to Cart"
                                            onClick={() => handleAddProductToCart(cartProduct)}
                                        />
                                    </div></> :
                                    <>
                                        <h1>Product is not availabe</h1>
                                    </>
                                }

                            </>}
                    </>}
            </div>
        </div>
    );
};

export default ProductDetails;