import "./App.css";
import Container from "./components/Container";
// @ts-ignore
import SendIcon from "./assets/svg/paper-plane.svg?react";
// @ts-ignore
import MicIcon from "./assets/svg/mic.svg?react";
// @ts-ignore
import useSpeechRecognition from "./hooks/useSpeechRecognition.js";
import { useEffect, useState } from "react";

export default function App() {
   const [input, setInput] = useState("");
   const { start, stop, transcript, isListening } =
      useSpeechRecognition();
   // @ts-ignore
   function handleSubmit(e) {
      e.preventDefault();
   }
   //@ts-ignore
   function handleInputChange(e) {
      setInput(e.target.value);
   }
   function handleMicClick() {
      if (!isListening) {
         start();
      } else {
         stop();
      }
   }
   useEffect(() => {
      if (transcript) {
         setInput(`${transcript.results[0][0].transcript}`);
      }
   }, [isListening]);
   return (
      <main className="dark:bg-slate-800">
         <Container className={`min-h-screen`}>
            <form onSubmit={handleSubmit}>
               <div className="flex items-center justify-center pt-5 w-[90%] relative">
                  <input
                     type="text"
                     value={input}
                     className="input input-bordered w-full input-md"
                     onChange={handleInputChange}
                  />
                  <button
                     className="absolute right-14 w-10"
                     onClick={handleMicClick}
                  >
                     <MicIcon
                        className={`h-20 ${
                           isListening
                              ? "stroke-red-500"
                              : "stroke-slate-900"
                        }`}
                     />
                  </button>
                  <button className="btn btn-square btn-primary absolute right-0">
                     <SendIcon className="w-[50%] fill-white" />
                  </button>
               </div>
            </form>
         </Container>
      </main>
   );
}
