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
  { id: 1, name: "tivi", price: "400", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrYThaNCZJISzMftpgEP5RoUXA62moYynlEA&s" },
  { id: 2, name: "tủ lạnh", price: "5400", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpxcu8YtgiLp9zJWOp52QZTB_s_u5SVCzraw&s" },
  { id: 3, name: "máy giặt", price: "849", imageUrl: "data:image/jpeg;base64,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" },
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
