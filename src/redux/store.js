import porjectReducer from "@/redux/slices/ProjectSlice";
import skillsReducer from "@/redux/slices/skillSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = () => {
  return configureStore({
    reducer: {
      projects: porjectReducer,
      skills: skillsReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export default store;
