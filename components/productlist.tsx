import { useContext } from "react";
import { Context } from "../contexts/cart";

const ProductList = ({ products }: { products: any[] }) => {
  return (
    <div className={listStyle}>
      <div className={listGridStyle}>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

const ProductItem = ({ product }: { product: any }) => {
  const { dispatch } = useContext(Context as any);
  return (
    <div className="group">
      <div className={itemContainer}>
        <img src={product.imageUrl ? product.imageUrl : 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg'} className={imageStyle} />
      </div>
      <div className="flex flex-row justify-between items-center mt-4">
        <div>
          <h3 className="text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="text-lg font-medium text-gray-900">
            $ {product.price}
          </p>
        </div>
        <button className="p-2 bg-purple-100 uppercase rounded" onClick={() => {
          dispatch({ type: 'ADD_TO_CART', payload: product })
        }}>
          Buy Now
        </button>
      </div>
    </div>
  )
}

const listStyle = `mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`
const listGridStyle = `grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8`
const itemContainer = `aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-6 w-full overflow-hidden rounded-lg bg-gray-200`
const imageStyle = `h-full w-full object-cover object-center group-hover:opacity-75`

export default ProductList
