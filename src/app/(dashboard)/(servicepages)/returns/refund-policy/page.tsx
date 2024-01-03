

const page = () => {
    return (
        <div className="mt-4 flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Issuance of Refunds</h1>
            <ol className="list-decimal pl-8">
                <li>
                    The processing time of your refund depends on the type of refund and the payment method you used.
                </li>
                <li>
                    The refund period / process starts when ShopyBuz has processed your refund according to your refund type.

                </li>
                <li>
                    The refund amount covers the item price and shipping fee for your returned product.
                </li>
            </ol>
            <h1 className="text-xl font-semibold">Refund Types</h1>
        </div>
    );
};

export default page;