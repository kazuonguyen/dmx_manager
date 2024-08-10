"use client";
import { useState, useEffect } from "react";
import Menu from "@/components/Menu/Menu";

interface Product {
  MA_SP: string;
  MA_MH: string;
  TEN_SP: string;
  DVT: string;
  SO_LUONG: string;
}

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    fetch("/api/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    if (
      newProduct.MA_SP &&
      newProduct.MA_MH &&
      newProduct.TEN_SP &&
      newProduct.DVT &&
      newProduct.SO_LUONG
    ) {
      fetch("/api/add-product", { // Updated endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })
        .then((response) => response.json())
        .then(() => {
          // Refresh the product list after adding a new product
          fetch("/api/product")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error fetching products:", error));
          setNewProduct({});
        })
        .catch((error) => console.error("Error adding product:", error));
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="flex mt-12 justify-center items-center h-full w-full">
      <div className="p-8 max-w-6xl mx-auto bg-gray-50 shadow-lg rounded-lg">
      <img
                    className="mx-auto h-20 w-auto"
                    src="https://thietkemyb.com.vn/wp-content/uploads/2022/10/foody-logo-dienmay-final-635947786757262452.jpg"
                    alt="Your Company"
                />
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Product Management
        </h1>
        <Menu />
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 md:mr-8">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Add New Product
              </h2>
              <form className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <input
                    type="text"
                    name="MA_SP"
                    placeholder="Product ID"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.MA_SP || ""}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="MA_MH"
                    placeholder="Item ID"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.MA_MH || ""}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="TEN_SP"
                    placeholder="Product Name"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.TEN_SP || ""}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="DVT"
                    placeholder="Unit"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.DVT || ""}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="SO_LUONG"
                    placeholder="Quantity"
                    className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newProduct.SO_LUONG || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddProduct} // Updated to type="button"
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                >
                  Add Product
                </button>
              </form>
            </section>
          </div>

          <div className="md:w-2/3">
            <section>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Product List
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                  <thead>
                    <tr>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">
                        Product ID
                      </th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">
                        Item ID
                      </th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">
                        Name
                      </th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">
                        Unit
                      </th>
                      <th className="p-3 text-left text-gray-700 font-medium border-b">
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.MA_SP} className="border-b">
                        <td className="p-3">{product.MA_SP}</td>
                        <td className="p-3">{product.MA_MH}</td>
                        <td className="p-3">{product.TEN_SP}</td>
                        <td className="p-3">{product.DVT}</td>
                        <td className="p-3">{product.SO_LUONG}</td>
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
