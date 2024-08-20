import React, { useState } from "react";

type Props = {
  placeholder: string;
  type: "text" | "password" | "email" | "date" | "radio";
  value: string;
  onChange: (value: string) => void;
  name?: string;
  checked?: boolean;
};

type State = {
  inputType: "text" | "password" | "email" | "date" | "radio";
};

function InputField({
  placeholder,
  type,
  value,
  onChange,
  name,
  checked,
}: Props) {
  const [state, setState] = useState<State>({
    inputType: type === "date" ? "text" : type,
  });

  const handleFocus = () => {
    if (type === "date") {
      setState((prev) => ({ ...prev, inputType: "date" }));
    }
  };

  return (
    <input
      id={placeholder}
      placeholder={placeholder}
      type={state.inputType}
      onFocus={handleFocus}
      value={value}
      onChange={(e) => onChange!(e.target.value)}
      autoComplete="off"
      name={name}
      checked={checked}
      className={`w-full h-full outline-none rounded-lg border-none bg-white px-2 text-base text-black transition-all duration-300 ease-in-out shadow-allSide`}
    />
  );
}

export default InputField;
