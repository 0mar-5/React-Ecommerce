import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItem = state.wishlistItems.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        state.wishlistItems.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
    },
    toggleWishlistItem: (state, action) => {
      const existingIndex = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        // Item exists - remove it
        state.wishlistItems.splice(existingIndex, 1);
      } else {
        // Item doesn't exist - add it
        state.wishlistItems.push(action.payload);
      }
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});
export const wishlistLength = (state) => state.wishlist.wishlistItems.length;

export const wishlistReducer = wishlistSlice.reducer;
export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlistItem,
} = wishlistSlice.actions;
