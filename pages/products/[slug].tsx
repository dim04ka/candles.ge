import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

export default function Product({ products }) {

  const router = useRouter()
  const id = router.query.slug as string

  
  const product = products.filter((product) => product.id === Number(id))[0]

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta property="og:title" content={product.longDescription} key="title" />
      </Head>
      <div className="flex flex-col justify-between">
      <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Link href="/">
          <button className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4">
            Назад
          </button>
        </Link>
        <div className="mx-auto flex flex-col sm:flex-row">
          <Image
            alt="coffee"
            className="rounded-lg"
            src={product.images[0].link}
            width={560}
            height={640}
          />
          <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
            <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              {product.name}
            </h1>
            <h1 className="mt-3 text-4xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-3xl">
            ₾{product.price}
            </h1> 
            <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
              Описание
            </div>
            <p className="max-w-xl">{product.longDescription}</p>
          </div>
        </div>
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
  return {
    props: {
      products: data,
    },
  };
}

