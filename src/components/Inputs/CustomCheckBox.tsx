
'use client '

import { FieldValues, UseFormRegister } from "react-hook-form";

type CustomCheckBoxProps = {
    id: string,
    label: string,
    disabled?: boolean,
    register: UseFormRegister<FieldValues>
}
const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ id, label, disabled, register }) => {
    return (
        <div className="  w-full flex flex-row gap-1 items-center">
            <input  
            className="cursor-pointer accent-red-500 "
            id={id}
            disabled={disabled}
            {...register(id)}
            placeholder=''
            type="checkbox"
                />

            <label htmlFor={id} className="font-medium border-red-500 cursor-pointer">{label}</label>
        </div>
    );
};

export default CustomCheckBox;