
import AuthNav from "@/components/form/AuthNav"
import { Toaster } from "@/components/ui/toaster";
type AuthLayoutType = {
    children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutType> = ({ children }) => {
    return (

        <div className="min-h-screen flex flex-col justify-center items-center">
            <AuthNav />
            {children}
            <Toaster/>
        </div>
    );
};

export default AuthLayout;