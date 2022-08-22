import { useState } from "react";

interface IHandleError {
  error: string[]
  setError: (error: string[]) => void
  handleError: (error: any) => void
}

export const useHandleError = (): IHandleError => {
  const [error, setError] = useState<string[]>([]);
  const handleError = (error: any) => {
    console.log(error);
    const messages: string[] = [];
    if (error.errors) {
      for (let key in error.errors) {
        messages.push(error.errors[key]);
      }
    } else if (error.message) {
      messages.push(error.message);
    }
    setError(messages);
  }

  return {error, setError, handleError};
}