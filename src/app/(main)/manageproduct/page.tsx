'use client'
import { useState, useEffect } from 'react';
import Menu from '@/components/Menu/Menu';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

const sampleProducts: Product[] = [
  { id: 1, name: "Basic Tee", price: "400", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
  { id: 2, name: "Premium Hoodie", price: "5400", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRURqNO_jvzqiuoH3uHOWiykgDrnmP4vORCbQ&s" },
  { id: 3, name: "Classic Denim Jacket", price: "849", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbUp7lvlpyf-PWREKG7YccP8tty_Io-BXTbg&s" },
];

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts && JSON.parse(storedProducts).length > 0) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(sampleProducts);
    }
  }, []);

  // Save products to localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductSubmit = () => {
    const product: Product = {
      id: products.length + 1,
      name: newProduct.name || '',
      price: newProduct.price || '',
      imageUrl: newProduct.imageUrl || '',
    };
    setProducts([...products, product]);
    setNewProduct({});
  };

  return (
    <div className="flex mt-12 justify-center items-center h-full w-full">
      <div className="p-8 max-w-6xl mx-auto bg-gray-50 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Product Management</h1>
        <Menu />
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
                    name="price"
                    placeholder="Price"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.price || ''}
                    onChange={handleProductChange}
                  />
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.imageUrl || ''}
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
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Price</th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">Image URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b">
                        <td className="p-3">{product.id}</td>
                        <td className="p-3">{product.name}</td>
                        <td className="p-3">{product.price}</td>
                        <td className="p-3">{product.imageUrl}</td>
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
