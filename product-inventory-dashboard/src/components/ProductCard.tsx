import React from "react";
import type { Product } from "../types";

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="text-center text-black dark:bg-gray-800 border rounded-lg shadow p-4 flex flex-col items-center bg-white hover:shadow-lg transition w-full h-[320px] justify-between">
      <div className="w-full h-40 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-32 h-32 object-contain"
        />
      </div>
      <div className="flex flex-col flex-grow justify-between w-full">
        <h3 className="text-lg font-semibold text-white line-clamp-2">
          {product.title}
        </h3>
        <div>
          <p className="text-green-600 font-bold my-2">
            ${product.price.toFixed(2)}
          </p>
          <p
            className={`text-sm ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
