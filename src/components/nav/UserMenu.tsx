'use client'


import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import { FaCaretDown } from "react-icons/fa6";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from 'next-auth/react'
import BackDrop from "./BackDrop";
// import { SafeUser } from "@/types";

type currentUserProps = {
    currentUser: any
}

const UserMenu: React.FC<currentUserProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    return (
        <>
            <div className=" relative z-30">
                <div onClick={toggleOpen}
                    className="p-2 border-[1px] border-orange-400 flex items-center rounded-full
             cursor-pointer hover:shadow-md transition text-slate-700 "
                >
                    <Avatar/>
                    <FaCaretDown className="text-orange-300 hover:text-orange-500"/>
                </div>
                {isOpen && (
                    <div className="absolute rounded-md shadow-md
                      w-[170px]  bg-white overflow-hidden right-0 top-12 
                       cursor-pointer  text-sm flex flex-col">

                        {
                            currentUser ? <div>
                                <Link href="/orders">
                                    <MenuItem onClick={toggleOpen}> Your Orders </MenuItem>
                                </Link>

                                <Link href="/admin">
                                    <MenuItem onClick={toggleOpen}>Admin dashboard</MenuItem>
                                </Link>
                                <hr/>
                                <MenuItem onClick={() => {
                                    toggleOpen();
                                    signOut()
                                }}>
                                    LogOut
                                </MenuItem>
                            </div>
                                :
                                <div>
                                    <Link href="/log-in">
                                        <MenuItem onClick={toggleOpen}>  Log in </MenuItem>
                                        <Link href="/register">
                                            <MenuItem onClick={toggleOpen}> Sign up </MenuItem>
                                        </Link>
                                    </Link>
                                </div>
                        }
                    </div>

                )}
            </div>
            {
                isOpen ? <BackDrop onClick={toggleOpen} /> : null
            }
        </>
    );
};

export default UserMenu;