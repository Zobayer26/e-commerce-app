'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from 'query-string'

type SingleCategoryProps = {
    label: string,
    icon: IconType,
    selected?: boolean
}

const SingleCategory: React.FC<SingleCategoryProps> = ({ label, icon: Icon, selected }) => {
    const router = useRouter()
    const params = useSearchParams()
    const handleClick = useCallback(() => {
        if (label === 'All') {
            router.push('/')
        }
        else {
            let cureentQuery = {}
            if (params) {
                cureentQuery = queryString.parse(params.toString())
            }
            const updateQuery: any = {
                ...cureentQuery, category: label
            }
            const url = queryString.stringifyUrl({
                url: '/',
                query: updateQuery
            },
                {
                    skipNull: true
                }
            )
            router.push(url)
        }
    }, [label, params, router])

    return (
        <div onClick={handleClick}
            className={`flex items-center justify-center text-center 
        gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer 
       ${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'} `}>
            <Icon size={20} />
            <div className="font-medium text-sm">{label}</div>
        </div>
    );
};

export default SingleCategory;