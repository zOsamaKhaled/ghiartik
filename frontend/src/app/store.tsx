import { configureStore } from "@reduxjs/toolkit";
import vendorsReducer from "../features/vendors/vendorsSlice";
import savedCarsReducer from "../features/savedCars/savedCarsSlice";
import searchReducer from "../features/search/searchSlice";
import MainModalReducer from "../features/mainModal/mainModalSlice";
import savedAddressesReducer from "@/features/savedAddresses/savedAddressesSlice";
export const store = configureStore({
  reducer: {
    vendors: vendorsReducer,
    savedCars: savedCarsReducer,
    savedAddresses: savedAddressesReducer,
    search: searchReducer,
    mainModal: MainModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
