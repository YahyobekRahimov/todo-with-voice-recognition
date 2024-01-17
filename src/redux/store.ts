import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

const store = configureStore({
   reducer: {
      todoSlice: todoSlice,
   },
});

export default store;
