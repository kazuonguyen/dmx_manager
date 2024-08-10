'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Menu: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('customerInfo'); // Also remove customer info if needed
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className="mb-8 flex justify-center space-x-4">
      <button 
        onClick={() => {router.push('/customer')}}   
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Customer
      </button>
      <button 
        onClick={() => {router.push('/manageproduct')}}  
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
      >
        Manage Products
      </button>
      <button 
        onClick={() => {router.push('/')}}  
        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
      >
        Sale Dashboard
      </button>
      <button 
        onClick={handleLogout}  
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Menu;