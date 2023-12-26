import Image from "next/image";
import Container from "./Container";

const HomeBanner = () => {
    return (
        <Container>
            <div className="relative bg-gradient-to-r from-green-500 to-orange-700 mb-8">
                <div className="mx-auto px-8 py-12 flex flex-col
            gap-2 md:flex-row items-center justify-evenly ">
                    <div className=" mb-8 md:mb-0 text-center">
                        <h1 className="text-white text-4xl font-bold md:text-6xl mb-4">
                            Winter Sale!
                        </h1>
                        <p className="text-lg md:text-xl text-white mb-2">
                            Enjoy discounts on selected items
                        </p>
                        <h2 className="text-2xl text-yellow-400 md:text-5xl font-bold">Get 50% OFF</h2>
                    </div>
                    <div className="w-1/3 relative aspect-video">
                        <Image src="/banner-image.png" alt="Banner_image" fill className="object-contain" />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default HomeBanner;