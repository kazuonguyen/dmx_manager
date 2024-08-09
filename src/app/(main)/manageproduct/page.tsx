'use client'
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1200, stock: 50 },
  { id: 2, name: 'Smartphone', category: 'Electronics', price: 800, stock: 120 },
  { id: 3, name: 'Headphones', category: 'Accessories', price: 150, stock: 200 },
];

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductSubmit = () => {
    const product: Product = {
      id: products.length + 1,
      name: newProduct.name || '',
      category: newProduct.category || '',
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) || 0,
    };
    setProducts([...products, product]);
    setNewProduct({});
  };

  return (
    <div className="flex mt-12 justify-center items-center h-full w-full">
      <div className="p-8 max-w-6xl mx-auto bg-gray-50 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Product Management</h1>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 md:mr-8">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Product</h2>
              <form
                className="bg-white p-6 rounded-lg shadow-md"
                onSubmit={(e) => { e.preventDefault(); handleProductSubmit(); }}
              >
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.name || ''}
                    onChange={handleProductChange}
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.category || ''}
                    onChange={handleProductChange}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.price || ''}
                    onChange={handleProductChange}
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock Quantity"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.stock || ''}
                    onChange={handleProductChange}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                >
                  Add Product
                </button>
              </form>
            </section>
          </div>

          <div className="md:w-2/3">
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product List</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Product ID</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Name</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Category</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Price</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b">
                        <td className="p-3">{product.id}</td>
                        <td className="p-3">{product.name}</td>
                        <td className="p-3">{product.category}</td>
                        <td className="p-3">{product.price}</td>
                        <td className="p-3">{product.stock}</td>
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

export default ProductManagementPage;
