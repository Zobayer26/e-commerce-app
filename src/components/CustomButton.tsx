

import { IconType } from 'react-icons'

type Buttontype = {
    label: string,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    custom?: string,
    icon?: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CustomButton: React.FC<Buttontype> = ({
    label, disabled, outline, small, custom, icon: Icon, onClick
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`disabled:opacity-70 disabled:cursor-not-allowed hover:bg-orange-300
             transition  flex items-center justify-center gap-2  ${small ? 'text-sm ' : ' text-md'}
               ${outline ? '' : "text-white"}     ${small ? 'px-2 py-1  border-[1px]' : 'py-3 px-4 border-[2px]'} 
                    ${custom ? custom : ''} `
            }>
            {Icon && <Icon size={24} />}
            {label}
        </button>
    );
};

export default CustomButton;