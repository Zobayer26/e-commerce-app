
import Container from "@/components/Container";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { IoMdHome } from "react-icons/io";
const AuthNav = () => {
    return (
        <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 
        top-0">
            <Container>
                <div className=" flex justify-between items-center">
                    <Link href="/"><IoMdHome className=" text-orange-500  transition-colors hover:text-orange-300" size={30} /></Link>
                    <Link className='bg-orange-500  px-3 py-2 rounded-md text-white transition-colors hover:bg-orange-300' href="/log-in"> Log in</Link>
                </div>
            </Container>
        </div>
    );
};

export default AuthNav;