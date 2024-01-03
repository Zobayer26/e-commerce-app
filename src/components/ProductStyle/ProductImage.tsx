
import Image from "next/image";
import { Cartproduct, selectedImgType } from "./ProductDetails";


type ProductImageType = {
    cartproduct: Cartproduct,
    product: any,
    handleColorSelect: (values: selectedImgType) => void
}

const ProductImage: React.FC<ProductImageType> = (
    {
        cartproduct, product, handleColorSelect
    }
) => {
    return (
        <div className=" grid grid-cols-6 gap-2 h-full max-h-[500px]
                  min-h-[300px] sm:min-h-[400px] ">
            <div className="flex flex-col items-center justify-center gap-4 cursor-pointer
                 border h-full max-h-[400px] min-h-[300px] sm:min-h-[400px] ">
                {product.images.map((image: selectedImgType) => {
                    return <div key={image.color}
                        onClick={() => handleColorSelect(image)}
                        className={`w-80% relative aspect-square rounded
                     border-teal-300 ${cartproduct.selectedImg.color === image.color ?
                                'border-[1.5px] ' : 'border-none'} `} >
                        <div className="w-[50px] ">
                            <Image alt={image.color} src={image.image}
                                fill className=" object-contain" />
                        </div>
                    </div>
                })}
            </div>
            <div className="col-span-5 relative  aspect-square">

                <Image src={cartproduct.selectedImg.image} alt={cartproduct.name} fill
                    className="w-full h-full object-contain 
                max-h-[500px] min-h-[300px] sm:min-h-[400px]"/>
            </div>
        </div>
    );
};

export default ProductImage;