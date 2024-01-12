'use client'

import Container from "@/components/Container";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard, MdLibraryAdd, MdDns, MdFormatListBulleted } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MdDashboardCustomize } from "react-icons/md";

const navbarData = [
    {
        label: "Summary",
        icon: MdDashboard,
        path: "/admin"
    },
    {
        label: "Add Products",
        icon: MdLibraryAdd,
        path: "/admin/add-product"
    },
    {
        label: "Manage Products",
        icon: MdDns,
        path: "/admin/manage-products"
    },
    {
        label: "Manage Orders",
        icon: MdFormatListBulleted,
        path: "/admin/manage-orders"
    },
    {
        label: "Manage Deliveyman",
        icon: MdFormatListBulleted,
        path: "/admin/manage-deliveryman"
    },
]

const AdminNav = () => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <div className="w-full top-20 shadow-sm border-b-[1px]  pt-4">
            <Container>
                <div className="flex justify-between md:justify-center md:gap-12">
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <div className="flex gap-1 items-center">
                                    <MdDashboardCustomize size={25}
                                        className="text-orange-500 hover:text-orange-300" />
                                    <h1>Dashboard</h1>

                                </div>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <div onClick={() => router.push('/profile')}>
                                        manage profile
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <div onClick={() => router.push('/admin/manage-user')}>
                                        manage user
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                    {navbarData.map((item) => (
                        <div key={item.label}>
                            <AdminNavItem
                                label={item.label}
                                icon={item.icon}
                                path={item.path}
                                selected={pathname === item.path}
                            />
                        </div>
                    ))}
                </div>
            </Container>

        </div>
    );
};

export default AdminNav;