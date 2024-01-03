'use client'

import Container from "../Container";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"


const DashboardNavBar = () => {

    return (
        <Container>
            <div className=" w-[600px] mx-auto max-h-[100px] items-center mb-3 p-1">
               
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
                                        Mens watches
                                    </MenubarItem>
                                    <MenubarItem>Womens watches</MenubarItem>
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

            </div>
        </Container>
    );
};

export default DashboardNavBar;