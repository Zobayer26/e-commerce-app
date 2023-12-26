import Image from "next/image";
import { FaUserCircle } from 'react-icons/fa'

type AvatarType = {
    src?: string | null | undefined
}

const Avatar: React.FC<AvatarType> = ({ src }) => {
    if (src) {
        return <Image src={src} alt="Avatar" width={30} height={30} className="rounded-full" />
    }
    return (
        <FaUserCircle className="text-orange-400" size={24} />
    );
};

export default Avatar;