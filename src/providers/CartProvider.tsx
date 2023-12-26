'use client'

import { CartContextProvider } from "@/hooks/customhooks";

type CartProvidertype = {
    children: React.ReactNode
}



const CartProvider: React.FC<CartProvidertype> = ({ children }) => {
    return (
        <div>

            <CartContextProvider >
                {children}
            </CartContextProvider>
        </div>
    );
};

export default CartProvider;