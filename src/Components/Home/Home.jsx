import MainSlider from "./MainSlider";
import CategorySlider from "./CategorySlider";
import { Helmet } from "react-helmet";
import Products from "../Products/Products";

export default function Home() {






  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>
      </Helmet>

      <MainSlider />
      <CategorySlider />
      <Products/>
      
    </>
  );
}
