import Link from "next/link";
import Container from "../Container";
import SearchBar from "../SearchBar";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { FaHeart } from "react-icons/fa";
import DashboardNavBar from "./DashboardNavBar";
const NavBar = async () => {
    const currentUser = await getCurrentUser()
    return (
        <div className="w-full sticky top-0 z-30">
            <div className="shadow-sm bg-slate-200 ">
                <div className="py-4 border-b[1px]">
                    <Container>
                        <div className="flex items-center justify-between gap-3 md:gap-0">
                            <Link href="/">
                                <p className="text-orange-500 font-bold text-2xl">ShopyBuz</p>
                            </Link>
                            <div className="hidden md:block"><SearchBar /></div>
                            <div className="flex items-center gap-8 md:gap-12">
                                <Link href="/wishlist"
                                    className="text-orange-500 transition-colors hover:text-orange-300"> <FaHeart size={25} /></Link>
                                <CartCount />
                                <UserMenu currentUser={currentUser} />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <div className="bg-white shadow-md">
                    <DashboardNavBar currentUser={currentUser?.role} />
                </div>
        </div>

    );
};

export default NavBar; 