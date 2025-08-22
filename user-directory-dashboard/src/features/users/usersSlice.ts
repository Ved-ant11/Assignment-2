import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { User, UsersApiResponse } from "../../types/index";

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedUser: User | null;
  currentPage: number;
  totalPages: number;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
  selectedUser: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchUsers = createAsyncThunk<UsersApiResponse, number>(
  "users/fetchUsers",
  async (page, { rejectWithValue }) => {
    try {
      const options = {
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        params: { limit: "10" },
      };
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`, 
        options
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch users"
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UsersApiResponse>) => {
          state.status = "succeeded";
          state.users = action.payload.data;
          state.currentPage = action.payload.page;
          state.totalPages = action.payload.total_pages;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { selectUser } = usersSlice.actions;
export default usersSlice.reducer;
