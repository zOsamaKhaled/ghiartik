import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { car_data } from "@/config/car_data";
import { vendors } from "@/config/vendors";
import { parts_data } from "@/config/parts_data";

export const getSearchResults = createAsyncThunk(
  "search/getResults",
  async (searchTerm: string) => {
    if (!searchTerm) {
      return [];
    }
    const allData = [
      ...car_data.map((c) => ({ ...c, type: "car" })),
      ...vendors.map((v) => ({ ...v, type: "vendor" })),
      ...parts_data.map((p) => ({ ...p, type: "part" })),
    ];

    const lowerCaseSearchTerm = searchTerm.toLowerCase(); // Convert to lowercase for case-insensitive search Query
    return allData.filter((item: any) => {
      const lowerCaseTerm = lowerCaseSearchTerm;

      // نحول المصفوفة models إلى string واحد
      const modelsText = Array.isArray(item.models)
        ? item.models.join(" ").toLowerCase()
        : item.models?.toLowerCase() || "";

      return (
        item.name_ar?.toLowerCase().includes(lowerCaseTerm) ||
        item.name_en?.toLowerCase().includes(lowerCaseTerm) ||
        item.name?.toLowerCase().includes(lowerCaseTerm) ||
        item.brand?.toLowerCase().includes(lowerCaseTerm) ||
        item.type?.toLowerCase().includes(lowerCaseTerm) ||
        item.id?.toLowerCase().includes(lowerCaseTerm) ||
        modelsText.includes(lowerCaseTerm)
      );
    });
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [] as any[],
    status: "idle",
    itemsPerPage: 9,
    page: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default searchSlice.reducer;
export const { setPage } = searchSlice.actions;
