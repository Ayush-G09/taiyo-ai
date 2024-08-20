import React, { ReactNode } from "react";

type Props = {
  placeholder?: string;
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  sx?: string;
};

function Button({
  placeholder,
  onClick,
  icon,
  disabled = false,
  children,
  sx,
}: Props) {
  const click = () => {
    if (!disabled) {
      onClick();
    }
  };
  return (
    <div
      className={`flex items-center justify-center px-2 py-1 rounded-lg shadow-allSide text-base font-bold bg-blue-500 text-white cursor-pointer gap-2 hover:bg-blue-400 hover:shadow-gray-500 transition-all duration-300 ease-in-out ${sx}`}
      onClick={click}
    >
      {icon}
      {placeholder}
      {children}
    </div>
  );
}

export default Button;
