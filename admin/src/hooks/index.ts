import { ChangeEvent, useState } from "react";

export const useInput = (initialState = "") => {
  const [value, setValue] = useState(initialState);

  return {
    value,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
      },
    },
  };
};
