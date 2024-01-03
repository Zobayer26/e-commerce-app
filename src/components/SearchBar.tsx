'use client'


import { useRouter } from "next/navigation";
// import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {

    const router = useRouter()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // if (!data.searchTerm) {
        //     return router.push('/')
        // }
        // const url = queryString.stringifyUrl({
        //     url: '/',
        //     query: {
        //         searchTerm: data.searchTerm
        //     }
        // }, { skipNull: true })
        // router.push(url)
        // reset()
    }
    return (
        <div className=" flex items-center gap-1">
            <input
                {...register('searchTerm')}
                autoComplete="off"
                type="text"
                className=" rounded-xl p-2 border border-orange-300 w-80
            focus:outline-none focus:border-[0.5px] focus:border-orange-500 "
                placeholder="Search Here"
            />
            <button onClick={handleSubmit(onSubmit)}
                className="bg-orange-500 hover:opacity-80
             text-white p-2 rounded-md "><FaSearch  /></button>
        </div>
    );
};

export default SearchBar;