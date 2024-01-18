import { useState } from "react";

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
   let commandIndex = commands.findIndex((command) => {
      return command.some((variations) =>
         variations.every((variation) =>
            transcript.includes(variation)
         )
      );
   });
   return commandIndex;
}
