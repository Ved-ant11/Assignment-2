import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../features/products/productsSlice";
import ProductCard from "./ProductCard";
import ProductFormModal from "./ProductFormModal";

type SortOption = "priceAsc" | "priceDesc" | "nameAsc" | "nameDesc";

const sortFunctions: { [key in SortOption]: (a: any, b: any) => number } = {
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  nameAsc: (a, b) => a.title.localeCompare(b.title),
  nameDesc: (a, b) => b.title.localeCompare(a.title),
};

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("nameAsc");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<null | (typeof list)[0]>(null);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchProducts());
  }, [dispatch, list.length]);

  const openAddModal = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product: (typeof list)[0]) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditProduct(null);
  };

  const handleSubmit = (productData: any, id?: number) => {
    if (id) {
      dispatch(updateProduct({ ...productData, id }));
    } else {
      dispatch(addProduct(productData));
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const filtered = list
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (categoryFilter ? p.category === categoryFilter : true))
    .sort(sortFunctions[sortOption]);

  const categories = Array.from(new Set(list.map((p) => p.category)));

  if (loading)
    return <div className="text-center p-4 text-gray-600">Loading products...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="text-white p-6 max-w-6xl mx-auto min-h-screen flex flex-col space-y-4 mb-10 sm:mb-0 sm:space-y-0 sm:space-x-4 sm:flex-row sm:flex-wrap sm:justify-center sm:items-start sm:pt-6">
      <div className="text-white flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded px-4 py-2 w-full sm:w-1/3 bg-white text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded px-4 py-2 w-full sm:w-1/5 bg-white text-black"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <select
          className="border rounded px-4 py-2 w-full sm:w-1/5 bg-white text-black "
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
        >
          <option value="nameAsc">Sort by Name (A-Z)</option>
          <option value="nameDesc">Sort by Name (Z-A)</option>
          <option value="priceAsc">Sort by Price (Low to High)</option>
          <option value="priceDesc">Sort by Price (High to Low)</option>
        </select>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 w-full sm:w-auto text-center transition-colors duration-300 ease-in-out"
        >
          Add New Product
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center col-span-full text-gray-600 w-full p-4">
          No products found.
        </p>
      ) : (
        <div className="bg-zinc-900 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full p-4 bg-white rounded-lg text-black bg-opacity-10 shadow-lg animate-fade-in animate-duration-1000 animate-ease-in animate-fill-both animate-delay-300 animate-iteration-count-1">
          {filtered.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex space-x-2">
                <button
                  onClick={() => openEditModal(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-300 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProductFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        initialData={editProduct}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProductList;
