import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product } from "../../types";
import type { RootState } from "../../app/store";

const API_BASE_URL =
  import.meta.env.VITE_API_URL;
const PRODUCTS_STORAGE_KEY = "product_inventory";

function saveProductsToLocalStorage(products: Product[]) {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}

function loadProductsFromLocalStorage(): Product[] | null {
  const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

const initialProducts = loadProductsFromLocalStorage();

export interface ProductsState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  list: initialProducts ?? [],
  loading: false,
  error: null,
};

const isLocalProduct = (product: Product) => product.id > 1000000;

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data.products as Product[];
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch products");
  }
});

export const addProduct = createAsyncThunk<
  Product,
  Omit<Product, "id">,
  { rejectValue: string }
>("products/addProduct", async (newProduct, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/add`, newProduct);
    const addedProduct = {
      ...response.data,
      id: Date.now(),
    };
    return addedProduct;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to add product");
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("products/updateProduct", async (updatedProduct, { rejectWithValue }) => {
  if (isLocalProduct(updatedProduct)) {
    return updatedProduct;
  }
  try {
    const updateData = {
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
      updateData
    );
    return response.data as Product;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return updatedProduct;
    }
    return rejectWithValue(error.message || "Failed to update product");
  }
});

export const deleteProduct = createAsyncThunk<
  number,
  number,
  { rejectValue: string; state: RootState }
>("products/deleteProduct", async (id, { rejectWithValue, getState }) => {
  const state = getState();
  const product = state.products.list.find((p) => p.id === id);
  if (product && isLocalProduct(product)) {
    return id;
  }
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return id;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return id;
    }
    return rejectWithValue(error.message || "Failed to delete product");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
          action.payload || action.error.message || "Error fetching products";
      })
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
          action.payload || action.error.message || "Error adding product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const idx = state.list.findIndex((p) => p.id === action.payload.id);
          if (idx !== -1) {
            state.list[idx] = action.payload;
            saveProductsToLocalStorage(state.list);
          }
          state.loading = false;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Error updating product";
      })
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
          action.payload || action.error.message || "Error deleting product";
      });
  },
});

export default productsSlice.reducer;
