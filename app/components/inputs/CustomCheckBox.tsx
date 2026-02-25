"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckBoxprops {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const CustomCheckBox = ({
  id,
  label,
  disabled,
  register,
}: CustomCheckBoxprops) => {
  return (
    <div className="w-full flex flex-row gap-4 items-center mt-4 px-4">
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        placeholder=""
        {...register(id)}
        className="cursor-pointer"
      />
      <label htmlFor={id} className="font-medium cursor-pointer">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckBox;
