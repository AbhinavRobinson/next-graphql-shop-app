import { gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import ProductList from "../components/productlist";

const GET_PRODUCTS = gql`
  query {
    getAllProducts {
      data {
        _id
        name
        description
        price
        imageUrl
        category
        shop {
          _id
        }
      }
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_PRODUCTS);
  if (loading) return <div className={defaultStyle}>Fetching Products</div>;
  if (!data) return <div className={defaultStyle}>No Products!</div>;
  const products = data.getAllProducts.data;
  return (
    <div className={defaultStyle}>
      <ProductList products={products} />
    </div>
  );
};

export default Home;

const defaultStyle = `flex min-h-screen flex-col flex-wrap items-center justify-center py-2`;
