'use client'

import Status from "@/components/Status";
import Heading from "@/components/ProductStyle/Heading";
import { formatCurrency } from "@/utils/formatCurrency";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md';
import OrderItem from "./OrderItem";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'
import { FcProcess } from "react-icons/fc";
import { useRef } from "react";

type OrderDetailsProps = {
  order: Order
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {

  const pdfRef:any = useRef()
  const downloadPDF = () => {
    const input = pdfRef.current
    html2canvas(input,{scale:2}).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/jpeg',1.0)
      const pdf = new jsPDF('p', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY=30
      pdf.addImage(imgData,'PNG',imgX,imgY,imgWidth*ratio,imgHeight*ratio,undefined,'FAST')
      pdf.save(`${order.id}.pdf`)
    })
  }

  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2 p-2"  ref={pdfRef}>
      <div className=" mt-8 ">
        <Heading title="Order Details" />
      </div>
      <div> Order ID: {order.id}</div>
      <div>Total Amount: <span className="font-bold">{formatCurrency(order.amount)}</span></div>
      <div className=" flex gap-2 items-center">
        <div>Payment status: </div>
        <div>
          {order.status === 'pending' ? <Status
            text="pending" icon={MdAccessTimeFilled}
            bg="bg-slate-200" color="text-slate-700"
          /> :
            order.status === 'complete' ? <Status
              text="Completed" icon={MdDone}
              bg="bg-green-200" color="text-green-700"
            /> : <></>
          }
        </div>
      </div>
      <div className=" flex gap-2 items-center">
        <div>Delivery status: </div>
        <div>
          {order.deliveryStatus === 'pending' ? <Status
            text="pending" icon={MdAccessTimeFilled}
            bg="bg-slate-200" color="text-slate-700"
          /> :
            order.deliveryStatus === 'dispatched' ? <Status
              text="dispatched" icon={MdDeliveryDining}
              bg="bg-purple-200" color="text-purple-700"
            /> : order.deliveryStatus === 'delivered' ? <Status
              text="delivered" icon={MdDone}
              bg="bg-green-200" color="text-green-700"
            /> : order.deliveryStatus === 'processing' ? <Status
              text="processing" icon={FcProcess}
              bg="bg-purple-200" color="text-purple-700"
            /> : <></>
          }

        </div>
      </div>
      <div>
        Date : {moment(order.createDate).fromNow()}
      </div>
      <div>
        <h2 className="font-semibold mt-4 mb-2">Products Ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">Product</div>
          <div className="justify-self-center">Price </div>
          <div className="justify-self-center">QTY </div>
          <div className="justify-self-end">TOTAL  </div>
        </div>
        {order.products && order.products.map((item) => {
          return (
            <OrderItem key={item.id} item={item}></OrderItem>)
        })}
      </div>
      <div>
        <button onClick={downloadPDF}
          className="border  px-2 py-1 bg-orange-500 hover:bg-orange-300 
     transition-colors rounded text-white">
          download
        </button>
      </div>

    </div>
  );
};

export default OrderDetails;

