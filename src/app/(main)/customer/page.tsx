'use client';
import { useState, useEffect } from 'react';
import Menu from '@/components/Menu/Menu';

interface Customer {
  MA_KH: string;
  HO_TEN_KH: string;
  NGAY_SINH_KH: string;
  DIEN_THOAI_KH: string;
  DIA_CHI_KH: string;
  GIOI_TINH_KH: string;
}

const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({});

  useEffect(() => {
    fetch('/api/customer')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const generateRandomMA_KH = () => {
    return 'KH' + Math.floor(1000 + Math.random() * 9000).toString();
  };

  const handleAddCustomer = () => {
    if (newCustomer.HO_TEN_KH && newCustomer.NGAY_SINH_KH && newCustomer.DIEN_THOAI_KH && newCustomer.DIA_CHI_KH && newCustomer.GIOI_TINH_KH) {
      console.log(newCustomer.DIEN_THOAI_KH);
      const customerToAdd = {
        MA_KH: generateRandomMA_KH(),
        HO_TEN_KH: newCustomer.HO_TEN_KH,
        NGAY_SINH_KH: newCustomer.NGAY_SINH_KH,
        DIEN_THOAI_KH: newCustomer.DIEN_THOAI_KH,
        DIA_CHI_KH: newCustomer.DIA_CHI_KH,
        GIOI_TINH_KH: newCustomer.GIOI_TINH_KH
      };

      fetch('/api/add-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerToAdd),
      })
        .then(response => response.json())
        .then(() => {
          // Refresh the customer list after adding a new customer
          fetch('/api/customer')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
          setNewCustomer({});
        })
        .catch(error => console.error('Error adding customer:', error));
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value,
    });
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.HO_TEN_KH.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.DIEN_THOAI_KH.includes(searchTerm) ||
    customer.DIA_CHI_KH.toLowerCase().includes(searchTerm)
  );

  return (
    <div className='flex mt-12 justify-center items-center h-full w-full'>
      <div className="p-8 max-w-6xl mx-auto bg-gray-50 shadow-lg rounded-lg">
      <img
                    className="mx-auto h-20 w-auto"
                    src="https://thietkemyb.com.vn/wp-content/uploads/2022/10/foody-logo-dienmay-final-635947786757262452.jpg"
                    alt="Your Company"
                />
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Customer List</h1>
        <Menu />
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, phone, or address"
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
              name="HO_TEN_KH"
              placeholder="Full Name"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newCustomer.HO_TEN_KH || ''}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="NGAY_SINH_KH"
              placeholder="Date of Birth"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newCustomer.NGAY_SINH_KH || ''}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="DIEN_THOAI_KH"
              placeholder="Phone"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newCustomer.DIEN_THOAI_KH || ''}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="DIA_CHI_KH"
              placeholder="Address"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newCustomer.DIA_CHI_KH || ''}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="GIOI_TINH_KH"
              placeholder="Gender"
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newCustomer.GIOI_TINH_KH || ''}
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
                <th className="p-3 text-left text-gray-700 font-medium border-b">Birth Date</th>
                <th className="p-3 text-left text-gray-700 font-medium border-b">Phone</th>
                <th className="p-3 text-left text-gray-700 font-medium border-b">Address</th>
                <th className="p-3 text-left text-gray-700 font-medium border-b">Gender</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer.MA_KH} className="border-b">
                  <td className="p-3">{customer.MA_KH}</td>
                  <td className="p-3">{customer.HO_TEN_KH}</td>
                  <td className="p-3">{customer.NGAY_SINH_KH}</td>
                  <td className="p-3">{customer.DIEN_THOAI_KH}</td>
                  <td className="p-3">{customer.DIA_CHI_KH}</td>
                  <td className="p-3">{customer.GIOI_TINH_KH}</td>
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
