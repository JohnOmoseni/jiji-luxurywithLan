import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type WishListProps = {
  items: any[];
  hasMutated: boolean;
};

const initialState: WishListProps = {
  items: [],
  hasMutated: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
    setHasMutated: (state, action) => {
      state.hasMutated = action.payload;
    },
    toggleWishlistItem: (state, action: PayloadAction<string>) => {
      const propertyId = action.payload;

      if (state.items.includes(propertyId)) {
        state.items = state.items.filter((id) => id !== propertyId);
      } else {
        state.items.push(propertyId);
      }
      state.hasMutated = !state.hasMutated;
    },
  },
});

export const { setWishlist, toggleWishlistItem, setHasMutated } = wishlistSlice.actions;

export default wishlistSlice.reducer;
