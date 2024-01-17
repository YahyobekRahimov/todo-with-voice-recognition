import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   addTodo,
   deleteTodo,
   reverseCompleted,
} from "../redux/todoSlice.ts";

const commands = [
   [
      ["create", "todo"],
      ["create", "to-do"],
      ["create", "to", "do"],
   ],
   [
      ["delete", "todo"],
      ["delete", "to-do"],
      ["delete", "to", "do"],
   ],
   [["mark", "as", "uncompleted"]],
   [["mark", "as", "completed"]],
];
export default function useCommands(transcript) {
   const dispatch = useDispatch();
   const todos = useSelector((state) => state.todoSlice);

   let commandIndex = commands.findIndex((command) => {
      return command.some((variations) =>
         variations.every((variation) =>
            transcript.includes(variation)
         )
      );
   });
   let text, id;
   switch (commandIndex) {
      case 0:
         text = transcript.slice(transcript.indexOf("do") + 1).trim();
         dispatch(
            addTodo({ id: Date.now(), text, completed: false })
         );
         break;
      case 1:
         id = transcript.slice(transcript.indexOf("do") + 1).trim();
         dispatch(deleteTodo(id));
         break;
      case 2:
         text = transcript
            .slice(transcript.indexOf("as"), transcript.indexOf("u"))
            .trim();
         index = todos.findIndex((todo) => todo.text == text);
         if (todos[index].completed) {
            dispatch(reverseCompleted(todos[index].id));
         }
         break;
      case 3:
         text = transcript
            .slice(transcript.indexOf("as"), transcript.indexOf("c"))
            .trim();
         index = todos.findIndex((todo) => todo.text == text);
         if (!todos[index].completed) {
            dispatch(reverseCompleted(todos[index].id));
         }
         break;
      default:
         break;
   }
}
