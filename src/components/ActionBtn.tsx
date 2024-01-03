import { IconType } from "react-icons";

type ActionBtnProps = {
    icon: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
}

const ActionBtn: React.FC<ActionBtnProps> = ({ icon: Icon, onClick, disabled }) => {
    return (
        <button onClick={onClick}
            disabled={disabled}
            className={` flex items-center justify-center rounded
      cursor-pointer w-[40px] h-[30px] text-orange-500 border hover:text-orange-300 transitons-colors
      border-orange-200 ${disabled && "opacity-50 cursor-not-allowed"}`}>
            <Icon size={18} />
        </button>
    );
};

export default ActionBtn;