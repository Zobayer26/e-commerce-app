'use client'

import Container from "@/components/Container";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard, MdLibraryAdd, MdDns, MdFormatListBulleted } from "react-icons/md";
import { usePathname } from "next/navigation";



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
    const pathname = usePathname()
    return (
        <div className="w-full top-20 shadow-sm border-b-[1px]  pt-4">
            <Container>
                <div className="flex justify-between md:justify-center md:gap-12">
                    {navbarData.map((item) => (
                        <AdminNavItem
                            label={item.label}
                            icon={item.icon}
                            path={item.path}
                            selected={pathname === item.path}
                        />
                    ))}
                </div>
            </Container>

        </div>
    );
};

export default AdminNav;