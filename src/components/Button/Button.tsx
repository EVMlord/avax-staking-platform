import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  active?: boolean;
  variant?: "primary" | "secondary" | "outlined";
  children?: React.ReactNode;
}

export default function Button({
  className,
  label,
  active,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  let variantClass = "";

  switch (variant) {
    case "primary":
      variantClass =
      `bg-white text-primary-600 rounded-full hover:bg-primary-50/80 focus:bg-primary-50/80 ring-2 ring-primary-500`;
      break;

    case "secondary":
      variantClass = "bg-primary-700 text-white hover:bg-primary-800 focus:bg-primary-800 rounded-md";
      break;

    case "outlined":
      variantClass =
        "bg-transparent text-primary-700 ring-2 hover:text-primary-600 focus:text-primary-600 ring-primary-500";
      break;

    default:
      throw new Error("invalid variant type supplied");
  }

  return (
    <button
      className={`py-3 px-5 font-bold !outline-none transition
        disabled:cursor-not-allowed disabled:opacity-40 ${variantClass} ${className}
        hover:shadow-md focus:shadow-md`}
      {...props}
      title={label}
    >
      {children || label}
    </button>
  );
}
