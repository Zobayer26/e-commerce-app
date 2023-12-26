
type BackdropProps = {
    onClick: () => void
}

const BackDrop: React.FC<BackdropProps> = ({ onClick }) => {
    return (
        <div onClick={onClick}
            className="z-20 bg-orange-100 opacity-50
             w-screen h-screen fixed top-0 left-0 ">
        </div>
    );
};

export default BackDrop;