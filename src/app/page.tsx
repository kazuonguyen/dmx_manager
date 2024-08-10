'use client';
import { useState, useEffect } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Order {
  id: number;
  customerId: number;
  product: string;
  quantity: number;
  price: number;
  status: string;
}

const sampleCustomers: Customer[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '234-567-8901' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012' },
];

const sampleOrders: Order[] = [
  { id: 1, customerId: 1, product: 'Laptop', quantity: 1, price: 1200, status: 'Pending' },
  { id: 2, customerId: 2, product: 'Smartphone', quantity: 2, price: 800, status: 'Confirmed' },
  { id: 3, customerId: 3, product: 'Headphones', quantity: 5, price: 150, status: 'Pending' },
];

const SalesRepDashboard: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [newOrder, setNewOrder] = useState<Partial<Order>>({});

  // Load data from local storage on component mount
  useEffect(() => {
    const storedCustomers = localStorage.getItem('customers');
    const storedOrders = localStorage.getItem('orders');

    if (storedCustomers && JSON.parse(storedCustomers).length > 0) {
      console.log('Setting sample customers');
      setCustomers(JSON.parse(storedCustomers));
    } 

    if (storedOrders && JSON.parse(storedOrders).length > 0) {
      console.log('Setting sample orders');

      setOrders(JSON.parse(storedOrders));
    } else {
      setOrders(sampleOrders);
      localStorage.setItem('orders', JSON.stringify(sampleOrders));
    }
  }, []);

  // Save customers and orders to local storage whenever they are updated
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewOrder({
      ...newOrder,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSubmit = () => {
    if (selectedCustomer) {
      const order: Order = {
        id: orders.length + 1,
        customerId: selectedCustomer.id,
        product: newOrder.product || '',
        quantity: Number(newOrder.quantity) || 1,
        price: Number(newOrder.price) || 0,
        status: 'Pending',
      };
      setOrders([...orders, order]);
      setNewOrder({});
    } else {
      alert('Please select a customer');
    }
  };

  const handleOrderConfirmation = (orderId: number) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: 'Confirmed' } : order
      )
    );
  };

  return (
    <div className='flex mt-12 justify-center items-center h-full w-full'>
      <div className="p-8 max-w-6xl mx-auto bg-gray-50 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sales Representative Dashboard</h1>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 md:mr-8">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Information</h2>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => handleCustomerSelect(JSON.parse(e.target.value))}
                >
                  <option value="" selected disabled hidden>Choose customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={JSON.stringify(customer)}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedCustomer && (
                <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
                  <p className="text-lg font-medium text-gray-900">Name: {selectedCustomer.name}</p>
                  <p className="text-gray-700">Email: {selectedCustomer.email}</p>
                  <p className="text-gray-700">Phone: {selectedCustomer.phone}</p>
                </div>
              )}
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">New Order</h2>
              <form
                className="bg-white p-6 rounded-lg shadow-md"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOrderSubmit();
                }}
              >
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <input
                    type="text"
                    name="product"
                    placeholder="Product"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newOrder.product || ''}
                    onChange={handleOrderChange}
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newOrder.quantity || ''}
                    onChange={handleOrderChange}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newOrder.price || ''}
                    onChange={handleOrderChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                >
                  Add Order
                </button>
              </form>
            </section>
          </div>

          <div className="md:w-2/3">
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Orders</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Order ID</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Customer</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Product</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Quantity</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Price</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Status</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="p-3">{order.id}</td>
                        <td className="p-3">
                          {customers.find((c) => c.id === order.customerId)?.name}
                        </td>
                        <td className="p-3">{order.product}</td>
                        <td className="p-3">{order.quantity}</td>
                        <td className="p-3">{order.price}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                            >
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3">
                          {order.status === 'Pending' && (
                            <button
                              onClick={() => handleOrderConfirmation(order.id)}
                              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                            >
                              Confirm
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesRepDashboard;