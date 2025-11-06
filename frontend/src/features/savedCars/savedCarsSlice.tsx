import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// أولًا: نعرّف نوع بيانات السيارة
interface Car {
  id: string;
  brand: string;
  model: string;
  year: string;
  VIN?: string; // Vehicle Identification Number
  VRN?: string; // Vehicle Registration Number
  image?: string;
}

// نوع الـ state
interface SavedCarsState {
  cars: Car[];
}

const initialState: SavedCarsState = {
  cars: [],
};

const savedCarsSlice = createSlice({
  name: "savedCars",
  initialState,
  reducers: {
    addCarToSavedList: (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload);
    },
    removeCarFromSavedList: (state, action: PayloadAction<string>) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    },
    editCarFromSavedList: (
      state,
      action: PayloadAction<{ id: string; updatedCar: any }>
    ) => {
      // Merge the updated fields into the existing car and preserve the original id.
      // This avoids losing the id (which could cause matches on empty ids) and ensures
      // only the targeted car is updated.
      state.cars = state.cars.map((car) =>
        car.id === action.payload.id
          ? { ...car, ...action.payload.updatedCar, id: car.id }
          : car
      );
    },
    clearCars: (state) => {
      state.cars = [];
    },
  },
});

export const {
  addCarToSavedList,
  removeCarFromSavedList,
  editCarFromSavedList,
  clearCars,
} = savedCarsSlice.actions;

export default savedCarsSlice.reducer;
