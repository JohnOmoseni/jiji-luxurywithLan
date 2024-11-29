import { CategoryTypes } from "@/types/api.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type StateProp = {
  openMenu: boolean;
  screenSize: number;
  isNetwork: boolean;
  selectedCategory: CategoryTypes;
};

const initialAppState: StateProp = {
  openMenu: false,
  screenSize: 0,
  isNetwork: true,
  selectedCategory: "Automobile",
};

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
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
export const { setScreenSize, setOpenMenu, setSelectedCategory, setNetwork } = appSlice.actions;
