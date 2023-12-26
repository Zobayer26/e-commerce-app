
'use client'
import Button from "@/components/CustomButton";
import CategoryInput from "@/components/CategoryInput";
import Heading from"@/components/ProductStyle/Heading";
import { categories } from "@/utils/Categories";
import { useCallback, useEffect, useState } from "react";
import { colors } from "@/utils/Colors";
import SelectColors from "@/components/SelectColors";
import Input from "@/components/Inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TextArea from "@/components/Inputs/Textarea";
import CustomCheckBox from "@/components/Inputs/CustomCheckBox";
import toast from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebaseApp from "@/lib/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";



export type ImageType = {
    color: string,
    colorCode: string,
    image: File | null
}

export type UploadedImageType = {
    color: string,
    colorCode: string,
    image: string
}
const AddProduct = () => {
    const [images, setImages] = useState<ImageType[] | null>(null)
    const [isProductCreated, setisProductCreated] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: "",
            inStock: false,
            images: [],
            price: '',
            quantity:''
        }
    })

    useEffect(() => {
        setCustomValue("images", images)

    }, [images])

    useEffect(() => {
        if (isProductCreated) {
            reset()
            setImages(null)
            setisProductCreated(false)
        }
    }, [isProductCreated])

    const onSubmitHandle: SubmitHandler<FieldValues> = async (data) => {
        //upload fire base
        setIsLoading(true)
        let uploadedImages: UploadedImageType[] = []
        if (!data.category) {
            setIsLoading(false)
            return toast.error('category not selected')
        }
        if (!data.images || data.images.length === 0) {
            setIsLoading(false)
            return toast.error('No Image Selected')
        }
        const handleImageUploads = async () => {
            toast('creating product please wait..')
            try {
                for (const item of data.images) {
                    if (item.image) {
                        const fileName = new Date().getTime() + "-" + item.image.name
                        const storage = getStorage(firebaseApp)
                        const storageRef = ref(storage, `products/${fileName}`)
                        const uploadTask = uploadBytesResumable(storageRef, item.image)

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on('state_changed',
                                (snapshot) => {
                                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                    console.log('Upload is ' + progress + '% done');
                                    switch (snapshot.state) {
                                        case 'paused':
                                            console.log('Upload is paused');
                                            break;
                                        case 'running':
                                            console.log('Upload is running');
                                            break;
                                    }
                                }, (error) => {
                                    console.log('Error uploading')
                                    reject(error)
                                },
                                () => {

                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                        uploadedImages.push({
                                            ...item,
                                            image: downloadURL
                                        })
                                        console.log('File available at', downloadURL);
                                        resolve()
                                    }).catch((error: any) => {
                                        reject(error)
                                    });
                                })
                        })
                    }
                }
            } catch (error) {
                setIsLoading(false)
                console.log('Error handling image uploads', error)
                return toast.error(' Error handling image uploads')
            }
        }
        await handleImageUploads();
        const productData = { ...data, images: uploadedImages }
        axios.post('/api/product',productData).then(() => {
            toast.success('Succesfully uploaded')
            setisProductCreated(true)
            router.refresh()
        }).catch((error:any) => {
            console.log(error)
            toast.error('something went wrong')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const category = watch('category')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const addimageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value]
            }
            return [...prev, value]
        })
    }, [])
    const removeimageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (prev) {
                const filterImages = prev.filter((item) => item.color !== value.color)
                return filterImages
            }
            return prev
        })
    }, [])

    return (
        <div>
            <div className="w-max-[200px] flex justify-center mb-2">
                <Heading title="Add a Products" />

            </div>
            <div className=" flex flex-col gap-2">
                <Input
                    id="name"
                    label="Name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required />

                <Input
                    id="price"
                    label="price"
                    disabled={isLoading}
                    register={register}
                    errors={errors} required />
                <Input
                    id="brand"
                    label="Brand"
                    disabled={isLoading}
                    register={register}
                    errors={errors} required />
                    <Input
                    id="quantity"
                    label="quantity"
                    disabled={isLoading}
                    register={register}
                    errors={errors} required />
                <TextArea
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required />
            </div>


            <CustomCheckBox

                id="inStock"
                register={register}
                label="Product in stock"
            />
            <div className="w-full">
                <p className="font-bold mb-2"> Select a category </p>
                <div className="grid grid-cols-2 md:grid-cols-3
                    max-h-[50vh] overflow-y-auto gap-3">
                    {
                        categories.map((item) => {
                            if (item.label === 'All') {
                                return null
                            }
                            return (
                                <div key={item.label} className="col-span">
                                    <CategoryInput
                                        onClick={(category) => setCustomValue('category', category)}
                                        label={item.label}
                                        icon={item.icon}
                                        selected={category == item.label}

                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="w-full flex flex-col flex-wrap gap-4">
                <div className=" font-bold">
                    Select the available product color and upload their image
                </div>

                <div className="text-sm w-[400px]">
                    You must upload an image for each of the color
                    selected otherwise your color selection will be ignored !
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {colors.map((item, index) => {
                        return (
                            <SelectColors
                                key={index}
                                item={item}
                                addImageToState={addimageToState}
                                removeImageFromState={removeimageToState}
                                isProductCreated={isProductCreated}
                            />
                        )
                    }
                    )}
                </div>
            </div>
            <Button  custom="bg-orange-500 hover:bg-orange-300"
            label={isLoading ? 'Loading ' : 'Add Product'}
                onClick={handleSubmit(onSubmitHandle)} />
        </div>
    );
};

export default AddProduct;
