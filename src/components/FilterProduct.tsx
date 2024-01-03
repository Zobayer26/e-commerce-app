'use client'

import { useCallback, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import Link from "next/link";


const FilterProduct = () => {

    const [searchValue, setSearchValue] = useState({
        lowPrice: 0,
        highPrice: 10000000,
        category: "",
        brand: ""
    })

    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;

        setSearchValue(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // const handleSubmit = (e: any) => {
    //     e.preventDefault()
    //     router.push({
    //        pathname:`/filter/aa`,
    //        query:{
    //         lowprice:searchValue.lowPrice
    //        }
    //     })

    // }
    return (

        <div className=" w-[1120px] mx-auto p-4">
            <div className=" relative z-30">
                <div onClick={toggleOpen}
                    className=" w-[100px] p-2 flex items-center hover:shadow-md
             cursor-pointer  text-slate-700 gap-1"
                >
                    <h1>Filter</h1>
                    <IoFilterSharp className="text-orange-500 hover:text-orange-300 transition-colors" />
                </div>
                {isOpen && (
                    <div className="absolute rounded-md shadow-md
                      w-[300px]  bg-orange-50 overflow-hidden left-0 top-12 
                       cursor-pointer  text-sm ">
                        <form
                            className="flex flex-col gap-2 p-2">
                            <div className="text-md font-semibold">Price Range</div>
                            <div className="flex items-center gap-2">
                                <input className={`${CustomStyle} w-[100px]`}
                                    type="number"
                                    name="lowPrice"
                                    value={searchValue.lowPrice}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                />
                                <div>upto</div>
                                <input className={`${CustomStyle} w-[100px]`}
                                    type="number"
                                    name="highPrice"
                                    value={searchValue.highPrice}
                                    onChange={handleInputChange}
                                    placeholder="1000000"
                                />
                            </div>
                            <div className="text-md font-semibold">Category</div>
                            <input
                                type="text" className={`${CustomStyle} w-[250px]`}
                                value={searchValue.category}
                                name="category"
                                onChange={handleInputChange}
                                placeholder="category"
                            />
                            <div className="text-md font-semibold">Brand</div>
                            <input
                                value={searchValue.brand}
                                name="brand"
                                onChange={handleInputChange}
                                type="text" className={`${CustomStyle} w-[250px]`}
                                placeholder="brand"
                            />
                            <Link href={{
                                pathname: '/filter',
                                query: {
                                    lowprice: searchValue.lowPrice,
                                    highprice: searchValue.highPrice,
                                    category: searchValue.category,
                                    brand: searchValue.brand
                                }
                            }}><button className=" p-1 max-w-[250px] rounded-sm bg-white border">Search</button></Link>
                        </form>
                    </div>

                )}
            </div>
            {
                isOpen ? <div onClick={toggleOpen}
                    className="z-20 w-screen h-screen fixed top-0 left-0 ">
                </div> : null
            }

        </div>

    );
};

export default FilterProduct;




const CustomStyle = "border  p-1 rounded-sm"





