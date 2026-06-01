import { useState } from "react";
import PageHeader from "../components/PageHeader";
import products from "../data/product.json";
import { Link } from "react-router-dom";

export default function Product() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {/* HEADER */}
      <PageHeader title="Products" breadcrumb="Dashboard / Products">
        <button
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-green-500 px-4 py-2 text-white"
        >
          Add Product
        </button>
      </PageHeader>

      {/* FORM */}
      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">Add Product</h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Product Title"
              className="rounded-lg border p-3"
            />

            <input
              type="text"
              placeholder="Product Code"
              className="rounded-lg border p-3"
            />

            <input
              type="text"
              placeholder="Category"
              className="rounded-lg border p-3"
            />

            <input
              type="text"
              placeholder="Brand"
              className="rounded-lg border p-3"
            />

            <input
              type="number"
              placeholder="Price"
              className="rounded-lg border p-3"
            />

            <input
              type="number"
              placeholder="Stock"
              className="rounded-lg border p-3"
            />

            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
              Save Product
            </button>
          </div>
        </div>
      )}

      {/* TABLE */}
      <div className="rounded-xl bg-white p-6 shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">ID</th>

              <th>Title</th>

              <th>Code</th>

              <th>Category</th>

              <th>Brand</th>

              <th>Price</th>

              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link
                    to={`/products/${item.id}`}
                    className="text-emerald-400 hover:text-emerald-500"
                  >
                    {item.title}
                  </Link>
                </td>

                <td>{item.title}</td>

                <td>{item.code}</td>

                <td>{item.category}</td>

                <td>{item.brand}</td>

                <td className="text-green-600 font-semibold">
                  Rp {item.price.toLocaleString("id-ID")}
                </td>

                <td>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
