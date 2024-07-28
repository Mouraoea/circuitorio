import React from "react";
import MouseInput from "./MouseInput";
import KeyboardInput from "./KeyboardInput";

const Input: React.FC = () => {
  return (
    <>
      <MouseInput />
      <KeyboardInput />
    </>
  );
};

export default Input;
