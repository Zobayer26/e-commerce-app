import Link from "next/link";
import { IconType } from "react-icons";

type AdminNavItemProps = {

    selected?: boolean,
    label: string,
    icon: IconType,
    path: string
}



const AdminNavItem: React.FC<AdminNavItemProps> = ({ selected, label, icon: Icon, path }) => {
    return (

       <div className={`pb-2 border-b-2 ${selected ?"border-b-orange-500 text-slate-900" :
       "border-transparent text-slate-500"}`}>
         <Link href={path} className="flex gap-1">
            <Icon className="text-orange-500 hover:text-orange-300 transition-colors" size={20} />
            <div>{label}</div>
        </Link>
       </div>

    );
};

export default AdminNavItem;

