'use client';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation'
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [isPaymentInitiated, setIsPaymentInitiated] = useState<boolean>(false);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const imageUrl = searchParams.get('imageUrl');

    if (id && name && price && imageUrl) {
      setProduct({ id, name, price, imageUrl });
    } else {
      // Redirect back to products page if no product details are found
      router.push('/');
    }
  }, [router]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handlePayNow = () => {
    setIsPaymentInitiated(true);
    // Simulate payment processing
    setTimeout(() => {
      alert('Payment processing...');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
          <header className="bg-blue-600 text-white p-4">
            <h1 className="text-xl font-bold">Checkout</h1>
          </header>
          <div className="p-6">
            {!isPaymentInitiated ? (
              <>
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-full border border-gray-200"
                  />
                  <h2 className="text-lg font-semibold mt-4">{product.name}</h2>
                  <p className="text-gray-600">{product.price}</p>
                </div>
                <div className="border-t border-gray-200 py-4">
                  <h3 className="text-md font-semibold text-gray-800">Billing Information</h3>
                  <p className="mt-2 text-gray-600">Name: {product.name}</p>
                  <p className="text-gray-600">Price: {product.price}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={handlePayNow}
                    className="w-full rounded bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Pay Now
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">Billing Details</h2>
                <div className="mt-4">
                  <p className="text-lg font-medium text-gray-800">Product Name: {product.name}</p>
                  <p className="text-lg font-medium text-gray-800">Price: {product.price}</p>
                  <p className="text-lg font-medium text-gray-800">Quantity: 1</p>
                  <p className="text-lg font-medium text-gray-800">Total: {product.price}</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/')}
                    className="w-full rounded bg-gray-600 px-4 py-2 text-white font-semibold hover:bg-gray-700 transition"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer className="bg-gray-200 text-center py-4 text-gray-600">
        &copy; {new Date().getFullYear()} My E-Commerce Site
      </footer>
    </div>
  );
}
