import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

const store = configureStore({
   reducer: {
      todoSlice: todoSlice,
   },
});

// @ts-ignore
const subscribe = store.subscribe((e) => {
   console.log(e);
});

export default store;
