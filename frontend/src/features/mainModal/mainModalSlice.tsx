import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainModalSLice {
  isOpen: boolean;
  type:
    | "login"
    | "register"
    | "forgot"
    | "addCarModal"
    | "editCarModal"
    | "addAddressModal"
    | "editAddressModal"
    | "invoiceModal"
    | "signOutModal"
    | "priceReqModal"
    | "complainModal"
    | "payModal";
}

const initialState: MainModalSLice = {
  isOpen: false,
  type: "login",
};

const MainModalSLice = createSlice({
  name: "mainModal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<MainModalSLice["type"]>) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = "login";
    },
  },
});

export const { openModal, closeModal } = MainModalSLice.actions;
export default MainModalSLice.reducer;
