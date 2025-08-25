import React, { useState, useEffect } from "react";
import type { Product } from "../types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Product | null;
  onSubmit: (productData: Omit<Product, "id">, id?: number) => void;
};

const ProductFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setPrice(initialData.price);
      setCategory(initialData.category);
      setStock(initialData.stock);
      setThumbnail(initialData.thumbnail);
      setDescription(initialData.description);
    } else {
      setTitle("");
      setPrice(0);
      setCategory("");
      setStock(0);
      setThumbnail("");
      setDescription("");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !category.trim()) {
      alert("Title and category are required.");
      return;
    }

    onSubmit(
      {
        title: title.trim(),
        price,
        category: category.trim(),
        stock,
        thumbnail: thumbnail.trim(),
        description: description.trim(),
        discountPercentage: 0,
        rating: 0,
        brand: "",
        images: [],
      },
      initialData?.id
    );

    onClose();
  };

  return (
    <div className="text-black fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none"
            required
            autoFocus
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={0}
            step="0.01"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={0}
            required
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
