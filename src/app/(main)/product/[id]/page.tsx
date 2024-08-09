'use client'
import { useRouter } from 'next/router';
import { products } from '../../../../data/product'; // Adjust the import path as necessary
import { usePathname } from 'next/navigation';
export default function ProductDetail() {
  const id =  usePathname().split('/').pop();
  
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px] md:w-1/2"
        />
        <div className="mt-4 md:mt-0 md:ml-8 md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <p className="mt-4 text-gray-500">{product.price}</p>
          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
            scelerisque enim ligula venenatis dolor.
          </p>
          <button className="mt-8 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
