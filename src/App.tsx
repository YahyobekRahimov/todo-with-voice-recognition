import "./App.css";
import Container from "./components/Container";
// @ts-ignore
import SendIcon from "./assets/svg/paper-plane.svg?react";
// @ts-ignore
import MicIcon from "./assets/svg/mic.svg?react";
// @ts-ignore
import useSpeechRecognition from "./hooks/useSpeechRecognition.js";
import { useEffect, useState } from "react";
import TodoCard from "./components/TodoCard.js";
import { useDispatch, useSelector } from "react-redux";
import { todo } from "./types/type.js";
import { addTodo, deleteTodo } from "./redux/todoSlice.js";
// @ts-ignore
import useCommands from "./hooks/useCommands.js";
import { reverseCompleted } from "./redux/todoSlice.js";

export default function App() {
   // @ts-ignore
   const todos = useSelector((state) => state.todoSlice);
   const dispatch = useDispatch();
   const [input, setInput] = useState("");
   const { start, transcript, isListening } = useSpeechRecognition();

   // * Functions
   // @ts-ignore
   function handleSubmit(e) {
      e.preventDefault();
      if (input.trim().length) {
         dispatch(
            addTodo({ id: Date.now(), text: input, completed: false })
         );
         setInput("");
      }
   }
   //@ts-ignore
   function handleInputChange(e) {
      setInput(e.target.value);
   }
   function handleMicClick() {
      if (!isListening) {
         start();
      }
   }
   useEffect(() => {
      if (transcript && !isListening) {
         setInput(`${input} ${transcript}`);
         const commandIndex = useCommands(transcript.toLowerCase());
         let text: string, id: number, index: number;
         switch (commandIndex) {
            case 0:
               text = transcript
                  .slice(transcript.indexOf("do") + 1)
                  .trim();
               dispatch(
                  addTodo({ id: Date.now(), text, completed: false })
               );
               break;
            case 1:
               id = transcript
                  .slice(transcript.indexOf("do") + 1)
                  .trim();
               dispatch(deleteTodo(id));
               break;
            case 2:
               text = transcript
                  .slice(
                     transcript.indexOf("as"),
                     transcript.indexOf("u")
                  )
                  .trim();
               index = todos.findIndex(
                  (todo: todo) => todo.text == text
               );
               if (todos[index].completed) {
                  dispatch(reverseCompleted(todos[index].id));
               }
               break;
            case 3:
               text = transcript
                  .slice(
                     transcript.indexOf("as"),
                     transcript.indexOf("c")
                  )
                  .trim();
               index = todos.findIndex(
                  (todo: todo) => todo.text == text
               );
               if (!todos[index].completed) {
                  dispatch(reverseCompleted(todos[index].id));
               }
               break;
            default:
               break;
         }
      }
   }, [transcript, isListening]);
   return (
      <main className="dark:bg-slate-800 grid grid-cols-[1fr_2fr_1fr]">
         <Container></Container>
         <Container className={`min-h-screen`}>
            <form onSubmit={handleSubmit}>
               <div className="mt-5 w-full relative">
                  <input
                     type="text"
                     value={input}
                     className="input input-bordered w-full input-md"
                     onChange={handleInputChange}
                  />
                  <button
                     type="button"
                     className="absolute top-3 right-14 w-10"
                     onClick={handleMicClick}
                  >
                     <MicIcon
                        className={`${
                           isListening
                              ? "stroke-red-500"
                              : "stroke-slate-900"
                        }`}
                     />
                  </button>
                  <button className="btn btn-square btn-primary absolute top-0 right-0">
                     <SendIcon className="w-[50%] fill-white" />
                  </button>
               </div>
            </form>
            <div className="flex flex-col gap-5 mt-5">
               {todos.map((todo: todo) => (
                  <TodoCard key={todo.id} currentTodo={todo} />
               ))}
            </div>
         </Container>
         <Container className="pl-7">
            <h1 className="ml-10 mt-5 text-2xl">Commands</h1>
            <ol className="list-decimal">
               <li className="text-[1.15rem]">
                  <b>Create to-do </b>[<i>Name of the to-do</i>]
               </li>
               <li className="text-[1.15rem]">
                  <b>Delete to-do </b>[<i>Name of the to-do</i>]
               </li>
               <li className="text-[1.15rem]">
                  <b>Mark </b>[<i>Name of the to-do</i>]{" "}
                  <b>as completed/uncompleted</b>
               </li>
            </ol>
         </Container>
      </main>
   );
}
