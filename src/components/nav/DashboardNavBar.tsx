'use client'

import { IoMdMenu } from "react-icons/io";
import { useCallback, useState } from "react";
import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
import Container from "../Container";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"


const DashboardNavBar = (currentUser: any) => {

    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])
    console.log(currentUser)
    return (
        <Container>
            <div className=" max-h-[100px] flex gap-4 items-center mt-2 mb-3 p-1">
                {currentUser.currentUser === 'admin' ? <>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="flex gap-1 items-center">
                                <h1>Dashboard</h1>
                                <IoMdMenu className="text-orange-500 hover:text-orange-300" size={20} />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Summary</DropdownMenuItem>
                            <DropdownMenuItem>Add Product</DropdownMenuItem>
                            <DropdownMenuItem>Manage Product</DropdownMenuItem>
                            <DropdownMenuItem>Order history</DropdownMenuItem>
                            <DropdownMenuItem>Customer complain</DropdownMenuItem>
                            <DropdownMenuItem>Manage user</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </> :
                    currentUser.currentUser === 'user' ?
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex gap-1 items-center">
                                        <h1>Dashboard</h1>
                                        <IoMdMenu className="text-orange-500 hover:text-orange-300" size={20} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>orders</DropdownMenuItem>
                                    <DropdownMenuItem>cart</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </> :
                        currentUser.currentUser === 'salesman' ? <>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex gap-1 items-center">
                                        <h1>Dashboard</h1>
                                        <IoMdMenu className="text-orange-500 hover:text-orange-300" size={20} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>orders</DropdownMenuItem>
                                    <DropdownMenuItem>cart</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </> :
                            <> <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex gap-1 items-center">
                                        <h1>Dashboard</h1>
                                        <IoMdMenu className="text-orange-500 hover:text-orange-300" size={20} />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>delivery</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </>

                }

                <div onClick={toggleOpen} className="cursor-pointer flex gap-1 items-center">
                    <h1>categories</h1>
                    {isOpen ? <>
                        <FaLessThan className="text-orange-500 text-md" size={18} />
                    </> : <FaGreaterThan className="text-orange-500 text-md" size={18} />}

                </div>

                {
                    isOpen ? <>
                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger>Phone</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        Apple
                                    </MenubarItem>
                                    <MenubarItem>Samsung</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Google</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Motorola</MenubarItem>
                                    <MenubarItem>OnePlus</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>OPPO</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Vivo</MenubarItem>
                                    <MenubarItem>Realme</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Xiaomi</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>POCO</MenubarItem>
                                    <MenubarItem>Samsung</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>HUAWEI</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Nokia</MenubarItem>
                                    <MenubarItem>TCL</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Mobile Phone Accessories</MenubarItem>
                                    <MenubarSeparator />

                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Laptop</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        Lenovo
                                    </MenubarItem>
                                    <MenubarItem>MSI</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Asus</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>HP</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Acer</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Dell</MenubarItem>
                                    <MenubarItem>MacBook</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Microsoft</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Infinix</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Toshiba</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>AVITIA_Laptop</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Samsung</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Walton</MenubarItem>
                                    <MenubarItem>Thunderobot</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Realme</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Xioami</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>HUAWEI</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>DOEl</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Razer</MenubarItem>


                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Desktop</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        Acer
                                    </MenubarItem>
                                    <MenubarItem>Asus</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Dell</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>HP</MenubarItem>
                                    <MenubarItem>Lenovo</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Walton</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>MSI</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Gaming PC</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Portable Mini PC</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Apple iMac</MenubarItem>

                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Watch</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        Men's watches
                                    </MenubarItem>
                                    <MenubarItem>Women's watches</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Kids watches</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Brands</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>TV</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        LED TV
                                    </MenubarItem>
                                    <MenubarItem>Smart TV</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Android TV</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>4K TV</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>AKASH Digital TV</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>TV Stand & Wall Mount</MenubarItem>

                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger>Accessories</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        keyboard
                                    </MenubarItem>
                                    <MenubarItem>Mouse</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Headphone</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Bluetooth Headphone</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Webcam</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Card Reader</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Microphone</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Memory Card</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Pen Drive</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>TV Card</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Bluetooth Speakers</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </> : <></>
                }


            </div>
        </Container>
    );
};

export default DashboardNavBar;