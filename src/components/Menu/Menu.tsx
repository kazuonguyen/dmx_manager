'use client';
import React from 'react';



const Menu: React.FC = () => {
  return (
    <div className="mb-8 flex justify-center space-x-4">
      <button  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
        Add Customer
      </button>
      <button  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
        Manage Products
      </button>
      <button  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
        View Reports
      </button>
      <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300">
        Settings
      </button>
    </div>
  );
};

export default Menu;