// @ts-ignore
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import DeleteIcon from "../assets/svg/delete.svg?react";
import { useState } from "react";
import { todo } from "../types/type";
import { deleteTodo, reverseCompleted } from "../redux/todoSlice";

export default function TodoCard({
   currentTodo,
}: {
   currentTodo: {
      id: number;
      text: string;
      completed: boolean;
   };
}) {
   const dispatch = useDispatch();
   const completed = useSelector(
      (state: {
         todoSlice: {
            id: number;
            text: string;
            completed: boolean;
         }[];
      }) =>
         state.todoSlice[
            state.todoSlice.findIndex(
               (todo) => todo.id == currentTodo.id
            )
         ].completed
   );
   const [checked, setChecked] = useState(completed);
   function handleCheckboxClick() {
      setChecked(!checked);
      dispatch(reverseCompleted(currentTodo.id));
   }
   function handleDelete() {
      dispatch(deleteTodo(currentTodo.id));
   }
   return (
      <div className="p-5 bg-blue-300 rounded-lg">
         <label className="label cursor-pointer grid grid-cols-[0.1fr_5fr_1fr] items-center justify-items-center gap-10">
            <input
               type="checkbox"
               className="checkbox checkbox-primary checkbox-lg"
               checked={checked}
               onChange={handleCheckboxClick}
            />
            <p className="text-xl">{currentTodo.text}</p>
            <button
               onClick={handleDelete}
               className="btn btn-error w-max"
            >
               <DeleteIcon />
            </button>
         </label>
      </div>
   );
}
