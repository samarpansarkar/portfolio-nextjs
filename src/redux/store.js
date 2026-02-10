import porjectReducer from "@/redux/slices/ProjectSlice";
import skillsReducer from "@/redux/slices/skillSlice";
import { configureStore } from "@reduxjs/toolkit";

const makeStore = () => {
  return configureStore({
    reducer: {
      projects: porjectReducer,
      skills: skillsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export default makeStore;
