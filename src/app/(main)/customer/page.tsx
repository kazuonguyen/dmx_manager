// pages/CustomerPage.tsx
'use client';
import { useState, useEffect } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({});

  useEffect(() => {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers && JSON.parse(storedCustomers).length > 0) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      setCustomers([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '234-567-8901' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '345-678-9012' },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.email && newCustomer.phone) {
      const newCustomerData: Customer = {
        id: customers.length + 1,
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
      };
      setCustomers([...customers, newCustomerData]);
      setNewCustomer({});
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    });
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  return (
    <div className='flex mt-12 justify-center items-center h-full w-full'>
      <div className="p-8 max-w-6xl mx-auto bg-gray-50 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Customer List</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Customer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newCustomer.name || ''}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newCustomer.email || ''}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newCustomer.phone || ''}
              onChange={handleInputChange}
            />
          </div>
          <button
            onClick={handleAddCustomer}
            className="mt-4 w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            Add Customer
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="p-3 text-left text-gray-700 font-medium border-b">ID</th>
                <th className="p-3 text-left text-gray-700 font-medium border-b">Name</th>
                <th className="p-3 text-left text-gray-700 font-medium border-b">Email</th>
                <th className="p-3 text-left text-gray-700 font-medium border-b">Phone</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="border-b">
                  <td className="p-3">{customer.id}</td>
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No customers found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;