import { createSlice } from "@reduxjs/toolkit";
import { vendors } from "@/config/vendors";

const initialState = {
  allVendors: vendors,
  filter: "rating",
  page: 1,
  itemsPerPage: 9,
};

export const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.page = 1; // لما يغير الفلتر يرجع لأول صفحة
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    removeVendorFromFav: (state, action) => {
      state.allVendors = state.allVendors.filter(
        (vendor) => vendor.id !== action.payload
      );
    },
    removeAllVendorsFromFav: (state) => {
      state.allVendors = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFilter,
  setPage,
  removeVendorFromFav,
  removeAllVendorsFromFav,
} = vendorsSlice.actions;

export default vendorsSlice.reducer;
