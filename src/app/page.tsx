
import HomeBanner from "@/components/HomeBanner";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/nav/NavBar";
import ProductCart from '@/components/ProductStyle/ProductCart'
import Container from "@/components/Container";
import getProducts, { IProductParams } from "@/actions/getProducts";

type HomeProps = {
  searchParams: IProductParams
}

export default async function Home({ searchParams }: HomeProps) {


  const products: any = await getProducts(searchParams)

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <HomeBanner />
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
                         xl:grid-cols-5 2xl:grid-cols-6 gap-8">

            {products.map((item: any) => {
              return <ProductCart data={item} key={item.id} />
            })}

          </div>

        </Container>
      </div>
      <Footer />
    </div>
  );
};

// export default Home;
export const revalidate = 0