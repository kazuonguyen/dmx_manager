'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const imageUrl = searchParams.get('imageUrl');

    if (id && name && price && imageUrl) {
      setProduct({ id, name, price, imageUrl });
    } else {
      router.push('/');
    }
  }, [router]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handlePayNow = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }
    setPaymentStatus('processing');
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      // Add order to localStorage
      const customerInfo = JSON.parse(localStorage.getItem('customerInfo') || '{}');
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        id: orders.length + 1,
        customerId: customerInfo.id || 1, // Assuming customer ID is stored in customerInfo, otherwise default to 1
        product: product.name,
        quantity: 1,
        price: parseFloat(product.price.replace('$', '')),
        status: "Pending"
      };
      orders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(orders));
    }, 2000);
  };

  const paymentMethods = [
    { id: 'credit', name: 'Credit Card' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'bank', name: 'Bank Transfer' }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden">
          <header className="bg-blue-600 text-white p-4">
            <h1 className="text-xl font-bold">Checkout</h1>
          </header>
          <div className="p-6">
            {paymentStatus === 'pending' && (
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
                  <h3 className="text-md font-semibold text-gray-800">Payment Method</h3>
                  <div className="mt-2">
                    {paymentMethods.map((method) => (
                      <label key={method.id} className="flex items-center space-x-2 mb-2">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedPaymentMethod === method.id}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="form-radio"
                        />
                        <span>{method.name}</span>
                      </label>
                    ))}
                  </div>
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
            )}
            {paymentStatus === 'processing' && (
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">Processing Payment</h2>
                <p className="mt-2">Please wait while we process your payment...</p>
              </div>
            )}
            {paymentStatus === 'success' && (
              <div className="text-center">
                <h2 className="text-xl font-semibold text-green-600">Payment Successful!</h2>
                <div className="mt-4">
                  <p className="text-lg font-medium text-gray-800">Product: {product.name}</p>
                  <p className="text-lg font-medium text-gray-800">Total Paid: {product.price}</p>
                  <p className="text-lg font-medium text-gray-800">Payment Method: {selectedPaymentMethod}</p>
                  <p className="text-lg font-medium text-gray-800">Status: Pending</p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/')}
                    className="w-full rounded bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
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
        &copy; {new Date().getFullYear()} Trang Co United
      </footer>
    </div>
  );
}