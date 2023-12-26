
import Footer from "@/components/footer/Footer";
import DashboardNavBar from "@/components/nav/DashboardNavBar";
import NavBar from "@/components/nav/NavBar";
import { getCurrentUser } from "@/actions/getCurrentUser";
type CommonlayoutType = {
    children: React.ReactNode
}

const layout: React.FC<CommonlayoutType> = async ({ children }) => {
    const currentUser = await getCurrentUser()
    return (
        <div className=" flex flex-col min-h-screen ">
            <NavBar />
            <DashboardNavBar currentUser={currentUser?.role} />
            <div className="flex-grow">{children}</div>
            <Footer />
        </div>
    );
};

export default layout;