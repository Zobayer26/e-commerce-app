
type NullDataProps = {
    title: string,
    custom?: boolean,
    text?: string,
    value?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const NullData: React.FC<NullDataProps> = ({ title, custom, onClick, text, value }) => {
    return (
        <div

            className="w-full h-[50vh] flex flex-col items-center 
              justify-center text-xl md:text-2xl " >
            <p className="font-medium">{title}</p>
            {custom && (
                <div className="flex gap-1 text-sm">
                    <p>{text}</p>
                    <button onClick={onClick}>
                        <p className="underline">{value}</p>
                    </button>
                </div>
            )
            }
        </div>
    );
};

export default NullData;