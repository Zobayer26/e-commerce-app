'use client'

import { ImageType } from "@/app/(dashboard)/admin/add-product/AddProduct";
import { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import CustomButton from "./CustomButton";

type SelectColorsProps = {
    item: ImageType,
    addImageToState: (value: ImageType) => void,
    removeImageFromState: (value: ImageType) => void,
    isProductCreated: boolean
}

const SelectColors: React.FC<SelectColorsProps> = ({ item, addImageToState,
    removeImageFromState, isProductCreated }) => {

    const [isSelected, setisSelected] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    useEffect(() => {
        if (isProductCreated) {
            setisSelected(false)
            setFile(null)
        }
    }, [isProductCreated])

    const handleFileChange = useCallback((value: File) => {
        setFile(value)
        addImageToState({ ...item, image: value })
    }, [])

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setisSelected(e.target.checked)
        if (!e.target.checked) {
            setFile(null)
            removeImageFromState(item)
        }
    }, [])

    return (
        <div className="grid grid-cols-1 overflow-y-auto
        border-b-[1.2px] border-orange-300 items-center">
            <div className="flex  gap-2 items-center  h-[60px]">
                <input id={item.color} type="checkbox"
                    checked={isSelected} onChange={handleCheck}
                    className="cursor-pointer accent-red-500" />
                <label htmlFor={item.color}
                    className="font-medium cursor-pointer">
                    {item.color}
                </label>
            </div>
            <>
                {isSelected && !file && (
                    <div className="col-span-2 text-center">
                        <SelectImage
                            item={item}
                            handleFileChange={handleFileChange}
                        />
                    </div>
                )}
                {file && (<div className="flex gap-2 text-sm col-span-2 
                items-center justify-between">

                    <p>{file?.name}</p>
                    <div className="w-[70px]">
                        <CustomButton label="Cancel"
                            small outline
                            onClick={() => {
                                setFile(null)
                                removeImageFromState(item)
                            }} />
                    </div>

                </div>)}
            </>
        </div>
    );
};

export default SelectColors;