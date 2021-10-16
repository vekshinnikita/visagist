import { ChangeEvent, RefObject, useEffect, useState } from "react";

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

export const useHover = (ref: RefObject<HTMLElement>) => {
  const [isHovering, setHovering] = useState(false);

  const on = () => setHovering(true);
  const off = () => setHovering(false);

  useEffect(() => {
    if (!ref.current) return;

    const node = ref.current;

    node.addEventListener("mouseenter", on);
    node.addEventListener("mousemove", on);
    node.addEventListener("mouseleave", off);

    return () => {
      node.removeEventListener("mouseenter", on);
      node.removeEventListener("mousemove", on);
      node.removeEventListener("mouseleave", off);
    };
  }, [ref]);

  return isHovering;
};
