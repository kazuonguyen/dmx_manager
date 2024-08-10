'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const itemsPerPage = 4;

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    // Retrieve products from localStorage
    let storedProducts = localStorage.getItem('products');
    if (!storedProducts) {
      // If no products found, add the sample products
      const sampleProducts = [
        {
          id: 1,
          name: 'Basic Tee',
          price: '400',
          imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
        },
        {
          id: 2,
          name: 'Premium Hoodie',
          price: '5400',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRURqNO_jvzqiuoH3uHOWiykgDrnmP4vORCbQ&s',
        },
        {
          id: 3,
          name: 'Classic Denim Jacket',
          price: '849',
          imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbUp7lvlpyf-PWREKG7YccP8tty_Io-BXTbg&s',
        },
      ];
      localStorage.setItem('products', JSON.stringify(sampleProducts));
      storedProducts = JSON.stringify(sampleProducts);
    }
    setProducts(JSON.parse(storedProducts));
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleBuyNow = (product: any) => {
    router.push(`/checkout?id=${product.id}&name=${product.name}&price=${product.price}&imageUrl=${product.imageUrl}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    router.push('/login');
  };

  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Product Collection
            </h2>
            <p className="mt-4 max-w-md text-gray-500">
              Discover our exclusive product collection.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded bg-red-600 text-white px-4 py-2"
          >
            Logout
          </button>
        </header>
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Showing <span>{displayedProducts.length}</span> of {products.length}
          </p>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {displayedProducts.map((product) => (
            <li key={product.id}>
              <div className="group block overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />
                <div className="relative bg-white pt-3">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {product.name}
                  </h3>
                  <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>
                    <span className="tracking-wider text-gray-900">
                      {product.price}
                    </span>
                  </p>
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="mt-2 w-full rounded bg-black text-white p-2 text-center"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`block size-8 rounded border ${
                  currentPage === index + 1
                    ? 'border-black bg-black text-white'
                    : 'border-gray-100'
                } text-center leading-8`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex size-8 items-center justify-center rounded border border-gray-100"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 010-1.414l-4-4a1 1 0 111.414 1.414L10.586 10l-3.293 3.293a1 1 0 000 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ol>
      </div>
    </section>
  );
}
