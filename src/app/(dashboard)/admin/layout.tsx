import AdminNav from "@/components/admin/AdminNav";
import type { Metadata } from 'next'

type AdminLayoutPageProps = {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: 'Z-Shop Admin',
    description: 'E-commerce app',
}


const AdminLayoutPage: React.FC<AdminLayoutPageProps> = ({ children }) => {

    return (
        <div>
            <AdminNav />
            {children}
        </div>
    );
};

export default AdminLayoutPage;