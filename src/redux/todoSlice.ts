import { createSlice } from "@reduxjs/toolkit";
// @ts-ignore
import { todo, todos } from "/src/types/type";

const todoSlice = createSlice({
   name: "todo Slice",
   initialState: [],
   reducers: {
      addTodo: (
         state: todos,
         {
            payload,
         }: {
            payload: {
               id: number;
               text: string;
               completed: boolean;
            };
         }
      ) => {
         state.push(payload);
         return state;
      },
      deleteTodo: (state: todos, { payload }) => {
         state = state.filter((todo: todo) => todo.id != payload);
         return state;
      },
      reverseCompleted: (state: todos, { payload }) => {
         const index = state.findIndex(
            (todo: todo) => todo.id == payload
         );
         if (index != -1) {
            state[index].completed = !state[index].completed;
            return state;
         }
         return state;
      },
   },
});

export const { addTodo, deleteTodo, reverseCompleted } =
   todoSlice.actions;

export default todoSlice.reducer;
