import { useRef } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'

export default function Gallery({ products, candles }) {

  let coffeeRef = useRef<HTMLParagraphElement>()


  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p
              className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl"
              ref={coffeeRef}
            >
              Наши свечи
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" id="start">
          {
            candles.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
        <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p
              className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl"
              ref={coffeeRef}
            >
              Материалы
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" id="start">
          {
            products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  function return_url(context) {
    if (process.env.NODE_ENV === "production") {
      return `https://${context.req.rawHeaders[1]}`;
    } else if (process.env.NODE_ENV !== "production") {
      return "http://localhost:3000";
    }
  }

  let url = return_url(context);

  const data = await fetch(`${url}/api/data`).then((res) => res.json());
  const materials = data.filter(el => el.category !== 'candles')
  const candles = data.filter(el => el.category === 'candles')

  return {
    props: {
      products: materials,
      candles
    },
  };
}
