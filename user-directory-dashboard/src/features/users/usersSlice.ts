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
  favouriteUserIds: number[];
}

const FAVOURITE_USERS_KEY = "favouriteUsers";

const loadFavourites = (): number[] => {
  try {
    const serializedFavorites = localStorage.getItem(FAVOURITE_USERS_KEY);
    if (serializedFavorites === null) {
      return [];
    }
    return JSON.parse(serializedFavorites);
  } catch (err) {
    console.error("Could not load favorites from localStorage", err);
    return [];
  }
};

const saveFavourites = (favourites: number[]): void => {
  try {
    localStorage.setItem(FAVOURITE_USERS_KEY, JSON.stringify(favourites));
  } catch (err) {
    console.error("Could not save favorites to localStorage", err);
  }
};

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
  selectedUser: null,
  currentPage: 1,
  totalPages: 1,
  favouriteUserIds: loadFavourites(),
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
    toggleFavourite: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      const isFavourite = state.favouriteUserIds.includes(userId);

      if (isFavourite) {
        state.favouriteUserIds = state.favouriteUserIds.filter(
          (id) => id !== userId
        );
      } else {
        state.favouriteUserIds.push(userId);
      }

      saveFavourites(state.favouriteUserIds);
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

export const { selectUser, toggleFavourite } = usersSlice.actions;
export default usersSlice.reducer;
