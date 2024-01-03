
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/nav/NavBar";
type CommonlayoutType = {
    children: React.ReactNode
}

const layout: React.FC<CommonlayoutType> = ({ children }) => {
    return (
        <div className=" flex flex-col min-h-screen ">
            <NavBar />
            <div className="flex-grow">{children}</div>
            <Footer />
        </div>
    );
};

export default layout;