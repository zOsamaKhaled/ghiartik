import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// أولًا: نعرّف نوع البيانات
interface Address {
  id: string;
  region: string;
  city: string;
  district: string;
  details: string;
  map: string;
}

// نوع الـ state
interface SavedAddressesState {
  addresses: Address[];
}

const initialState: SavedAddressesState = {
  addresses: [],
};

const savedAddressSlice = createSlice({
  name: "savedAddresses",
  initialState,
  reducers: {
    addAddressToSavedList: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    removeAddressFromSavedList: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
    },
    editAddressFromSavedList: (
      state,
      action: PayloadAction<{ id: string; updatedAddress: any }>
    ) => {
      // Merge the updated fields into the existing Address and preserve the original id.
      // This avoids losing the id (which could cause matches on empty ids) and ensures
      // only the targeted Address is updated.
      state.addresses = state.addresses.map((address) =>
        address.id === action.payload.id
          ? { ...address, ...action.payload.updatedAddress, id: address.id }
          : address
      );
    },
  },
});

export const {
  addAddressToSavedList,
  removeAddressFromSavedList,
  editAddressFromSavedList,
} = savedAddressSlice.actions;

export default savedAddressSlice.reducer;
