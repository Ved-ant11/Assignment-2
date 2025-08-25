import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "../../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PRODUCTS_STORAGE_KEY = "product_inventory";

function saveProductsToLocalStorage(products: Product[]) {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}

function loadProductsFromLocalStorage(): Product[] | null {
  const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

const initialProducts = loadProductsFromLocalStorage();

const initialState: ProductsState = {
  list: initialProducts ?? [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data.products as Product[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Fetch products failed");
    }
  }
);

export const addProduct = createAsyncThunk<Product, Omit<Product, "id">>(
  "products/addProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/add`, newProduct);
      return response.data as Product;
    } catch (error: any) {
      return rejectWithValue(error.message || "Add product failed");
    }
  }
);

export const updateProduct = createAsyncThunk<Product, Product>(
  "products/updateProduct",
  async (updatedProduct, { rejectWithValue }) => {
    try {
      const updateFields = {
        title: updatedProduct.title,
        description: updatedProduct.description,
        price: updatedProduct.price,
        discountPercentage: updatedProduct.discountPercentage,
        rating: updatedProduct.rating,
        stock: updatedProduct.stock,
        brand: updatedProduct.brand,
        category: updatedProduct.category,
        thumbnail: updatedProduct.thumbnail,
      };
      const response = await axios.put(
        `${API_BASE_URL}/${updatedProduct.id}`,
        updateFields
      );
      return response.data as Product;
    } catch (error: any) {
      return rejectWithValue(error.message || "Update product failed");
    }
  }
);

export const deleteProduct = createAsyncThunk<number, number>(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Delete product failed");
    }
  }
);

interface ProductsState {
  list: Product[];
  loading: boolean;
  error: string | null;
}


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.list = action.payload;
          state.loading = false;
          saveProductsToLocalStorage(state.list);
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Error fetching products";
      })

      // add product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.list.push(action.payload);
          state.loading = false;
          saveProductsToLocalStorage(state.list);
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Error adding product";
      })

      // update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const idx = state.list.findIndex((p) => p.id === action.payload.id);
          if (idx !== -1) state.list[idx] = action.payload;
          state.loading = false;
          saveProductsToLocalStorage(state.list);
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Error updating product";
      })

      // delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.list = state.list.filter((p) => p.id !== action.payload);
          state.loading = false;
          saveProductsToLocalStorage(state.list);
        }
      )
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          "Error deleting product";
      });
  },
});

export default productsSlice.reducer;
