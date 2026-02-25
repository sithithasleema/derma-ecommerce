"use client";

import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;

  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea = ({
  id,
  label,

  disabled,
  required,
  register,
  errors,
}: TextAreaProps) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        placeholder=""
        disabled={disabled}
        {...register(id, { required })}
        className={`peer w-full p-2 pt-6 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-65  disabled:cursor-not-allowed 
        ${errors[id] ? "border-rose-400" : "border-slate-300"}
        ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"} `}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text text-md duration-150 transform top-2 left-4 z-10 origin-[0] 
        peer-focus:scale-75 peer-focus:-translate-y-1 
    ${errors[id] ? "text-rose-500" : "text-slate-300"}
  `}
      >
        {label}
      </label>{" "}
    </div>
  );
};

export default TextArea;
