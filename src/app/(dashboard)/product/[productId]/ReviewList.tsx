'use client';

import Avatar from "@/components/Avatar";
import Heading from "@/components/ProductStyle/Heading";
import { Rating } from "@mui/material";
import moment from 'moment'
import { useState } from "react";


type ReviewListProps = {
    product: any
}

const ReviewList: React.FC<ReviewListProps> = ({ product }) => {
    // const [reply,setReply]=useState(false)
    
    if (product.reviews.length === 0) {
        return null
    }

    return (
        <div>
            <Heading title="Product review" />
            <div className="text-sm mt-2">

                {
                    product.reviews && product.reviews.map((review: any) => {
                        return <div key={review.id} className="max-w-[300px]">
                            <div className=" flex gap-2 items-center">
                                <Avatar src={review?.user.image} />
                                <div className="font-semibold">{review?.user.name}</div>
                                <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                            </div>
                            <div className="mt-2 ">
                                <Rating value={review.rating} readOnly />
                                <div className="ml-2">{review.comment}</div>
                                {/* <div className="mt-2 flex justify-between max-w-[300px]">
                                    <div>like</div>
                                    <div className="" onClick={()=>setReply(true)}>reply</div>
                              {
                                reply?<div><input type="text" placeholder="reply" /></div>:<></>
                              }
                                </div> */}

                                <hr className="my-4" />
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    );
};

export default ReviewList;