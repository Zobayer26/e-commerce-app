
import { IconType } from 'react-icons';


type CategoryInputProps = {
    selected?: boolean
    label: string,
    icon: IconType,
    onClick: (value: string) => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({ label, icon: Icon, selected, onClick }) => {



    return (
        <div onClick={() => onClick(label)} 
            className={`flex items-center rounded-xl border-2 p-4
            flex-col gap-2 hover:border-orange-500 transition 
            cursor-pointer ${selected ? "border-orange-500" : "border-slate-200"}`}>
            <Icon className='text-orange-500' size={30} />
            <div className='font-medium text-orange-500'>
                {label}
            </div>

        </div>
    );
};

export default CategoryInput;