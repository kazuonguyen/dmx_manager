'use client'
import { useState } from "react";

// Define a type for the product
interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

// Define the list of products
const products: Product[] = [
  { id: 1, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 2, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 3, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 4, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 1, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 2, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 3, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 4, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },  { id: 1, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 2, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 3, name: "dd", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 4, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },  { id: 1, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 2, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 3, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 4, name: "Basic Tee", price: "£24.00 GBP", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  // Add more products as needed
];

const itemsPerPage = 4;

export default function Page() {
  // State for current page
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Get products for current page
  const displayedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>
          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Showing <span>{displayedProducts.length}</span> of {products.length}
          </p>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {displayedProducts.map((product) => (
            <li key={product.id}>
              <a href="#" className="group block overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt=""
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
                </div>
              </a>
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
                    ? "border-black bg-black text-white"
                    : "border-gray-100"
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
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
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
