"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string | React.ReactElement;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: boolean;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full flex items-center justify-center gap-2 $
        ${
          outline
            ? "text-slate-700 border-2 border-black hover:border-b-2 hover:text-slate-900"
            : "text-md"
        }
        ${small ? "text-sm font-light" : "text-md"}
        ${small ? "py-1 px-2 w-1/2" : "py-3 px-4"}     
        ${custom ? "bg-background text-white hover:bg-accent" : ""}   
                `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
