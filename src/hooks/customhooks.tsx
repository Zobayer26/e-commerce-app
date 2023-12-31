import { Cartproduct } from "@/components/ProductStyle/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

type cartContextType = {
    cartTotalQty: number,
    cartTotalAmount: number,
    cartProducts: Cartproduct[] | null,
    handleAddProductToCart: (product: Cartproduct) => void,
    handleRemoveProducttoCart: (product: Cartproduct) => void,
    handleCartQtyIncrease: (product: Cartproduct) => void,
    handleCartQtyDecrease: (product: Cartproduct) => void,
    handleClearCart: () => void,
    paymentIntent: string | null,
    handleSetPaymentIntent: (val: string | null) => void

}
type Props = {
    [propsName: string]: any
}

export const cartContext = createContext<cartContextType | null>(null)

export const CartContextProvider = (props: Props) => {


    const [cartTotalQty, setCartTotalQty] = useState(0)
    const [cartProducts, setCartProducts] = useState<Cartproduct[] | null>(null)
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [paymentIntent, setpaymentIntent] = useState<string | null>(null)


    useEffect(() => {
        const cartItems: any = localStorage.getItem("zshopcart")
        const CProduct: Cartproduct[] | null = JSON.parse(cartItems)
        const eShopPaymentIntent: any = localStorage.getItem('eShopPaymentIntent')
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent)

        setCartProducts(CProduct)
        setpaymentIntent(paymentIntent)
    },[])

    useEffect(() => {
        if (cartProducts) {
            const getTotals = () => {
                const { total, qty } = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.qunatity
                    acc.total += itemTotal
                    acc.qty += item.qunatity
                    return acc
                },
                    {
                        total: 0,
                        qty: 0
                    }
                );
                setCartTotalQty(qty)
                setCartTotalAmount(total)
            }
            getTotals();
        }

    }, [cartProducts])
    // console.log(cartTotalAmount)

    const handleAddProductToCart = useCallback(async (product: Cartproduct) => {
        setCartProducts((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product]
            }
            else {
                updatedCart = [product]
            }

            toast.success('product added to cart')
            localStorage.setItem("zshopcart", JSON.stringify(updatedCart))
            return updatedCart
        })

        const res = await fetch('/api/updateQuantity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: product.id,
                quantity: product.qunatity  // product.id, null, product.qunatity
            })
        })
        if (res.ok) {
            toast.success("succesfull")
        }
        else {
            toast.error('error during update')
        }
    }, [])



    const handleRemoveProducttoCart = useCallback((product: Cartproduct) => {
        if (cartProducts) {
            const filterProduct = cartProducts.filter((item) => {
                return item.id !== product.id
            })
            setCartProducts(filterProduct)
            toast.success('product remove to cart')
            localStorage.setItem("zshopcart", JSON.stringify(filterProduct))
        }

    }, [cartProducts])

    const handleCartQtyIncrease = useCallback((product: Cartproduct) => {
        let updatedCart;
        if (product.qunatity === 10) {
            return toast.error("Oops! you have select maximum number ")
        }
        if (cartProducts) {
            updatedCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id)
            if (existingIndex > -1) {
                updatedCart[existingIndex].qunatity += 1

            }
            setCartProducts(updatedCart)
            localStorage.setItem('zshopcart', JSON.stringify(updatedCart))
        }

    }, [cartProducts])

    const handleCartQtyDecrease = useCallback((product: Cartproduct) => {
        let updatedCart;
        if (product.qunatity === 1) {
            return toast.error("Oops! you should  select at least 1 ")
        }
        if (cartProducts) {
            updatedCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id)
            if (existingIndex > -1) {
                updatedCart[existingIndex].qunatity -= 1

            }
            setCartProducts(updatedCart)
            localStorage.setItem('zshopcart', JSON.stringify(updatedCart))
        }

    }, [cartProducts])


    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('zshopcart', JSON.stringify(null))
    }, [cartProducts])

    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setpaymentIntent(val)
        localStorage.setItem('eShopPaymentIntent', JSON.stringify(val))
    }, [paymentIntent])

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProducttoCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        handleSetPaymentIntent,
        paymentIntent

    }
    return <cartContext.Provider value={value} {...props} />
}
export const customHooks = () => {
    const context = useContext(cartContext)
    if (context === null) {
        throw new Error("useCart must  be within a CartContexProvider")
    }
    return context
}