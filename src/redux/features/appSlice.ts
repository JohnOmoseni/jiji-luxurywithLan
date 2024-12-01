import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FilterState {
  searchQuery: string;
  type: string;
  location: string;
  propertyType: string;
  category: string;
}

interface AppState {
  selectedCategory: string;
  filters: FilterState;
  openMenu: boolean;
  screenSize: number;
  isNetwork: boolean;
}

const initialState: AppState = {
  selectedCategory: "all",
  filters: {
    type: "",
    location: "",
    propertyType: "",
    searchQuery: "",
    category: "",
  },
  openMenu: false,
  screenSize: 0,
  isNetwork: true,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setOpenMenu: (state, action: PayloadAction<boolean>) => {
      state.openMenu = action.payload;
    },
    setScreenSize: (state, action: PayloadAction<number>) => {
      state.screenSize = action.payload;
    },
    setNetwork: (state, { payload }) => {
      state.isNetwork = payload;
    },
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
  },
});

export default appSlice.reducer;
export const {
  setFilters,
  clearFilters,
  setOpenMenu,
  setScreenSize,
  setSelectedCategory,
  setNetwork,
} = appSlice.actions;
