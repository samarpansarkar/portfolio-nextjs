import porjectReducer from "@/redux/slices/ProjectSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = () => {
  return configureStore({
    reducer: {
      projects: porjectReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export default store;
