import Container from "@/components/Container";
import Heading from "@/components/ProductStyle/Heading";

const Return = () => {
    return (
        <Container>
            <div className=" mt-2">
                <Heading title="Conditions" />
                <p>
                    The product must be unused, unworn, unwashed and
                    without any flaws. Fashion products can be tried on to see if
                    they fit and will still be considered unworn. If a product is
                    returned to us in an inadequate condition, we reserve the right
                    to send it back to you.
                </p>
            </div>
        </Container>
    );
};

export default Return;