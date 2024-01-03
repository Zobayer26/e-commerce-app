
import ReturnNav from "@/components/returns/ReturnNav";
import Container from "@/components/Container";
type ReturnLayouttype = {
    children: React.ReactNode
}

const ReturnLayout: React.FC<ReturnLayouttype> = ({ children }) => {
    return (
        <Container>
            <ReturnNav />
            {children}
        </Container>
    );
};

export default ReturnLayout;