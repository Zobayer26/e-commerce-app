import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
// import './globals.css'
import '@/styles/global.css'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
        
      <body className={poppins.className}>
      <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)', //rgb(51 65 85)
            color: "#fff",
          }
        }} />
      <CartProvider>
            {children}
            </CartProvider>
      </body>
    </html>
  )
}
