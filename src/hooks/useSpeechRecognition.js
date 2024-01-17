import { useState, useEffect } from "react";

const SpeechRecognition =
   window.SpeechRecognition || window.webkitSpeechRecognition;

export default function useSpeechRecognition() {
   const [transcript, setTranscript] = useState("");
   const [isListening, setIsListening] = useState(false);
   const recognition = new SpeechRecognition();

   recognition.continuous = false;
   recognition.lang = "en-US";
   recognition.interimResults = true;

   recognition.addEventListener("start", function () {
      setIsListening(true);
   });
   recognition.addEventListener("end", function (e) {
      setIsListening(false);
   });

   recognition.addEventListener("result", function (event) {
      const currentTranscript = Array.from(event.results)
         .map((result) => result[0].transcript)
         .join("");
      setTranscript(currentTranscript);
   });

   function start() {
      recognition.start();
   }

   function stop() {
      recognition.stop();
   }

   return { start, stop, transcript, isListening };
}
