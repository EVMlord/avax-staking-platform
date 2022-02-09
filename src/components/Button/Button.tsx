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
      `bg-white text-primary-600 hover:bg-primary-50/80 focus:bg-primary-50/80 ring-2 ring-primary-500`;
      break;

    case "secondary":
      variantClass = "bg-primary-500 ring-primary text-white hover:bg-primary-600 focus:bg-primary-600";
      break;

    case "outlined":
      variantClass =
        "bg-transparent text-white ring-2 hover:bg-white hover:text-primary-600 focus:text-primary-600 ring-white";
      break;

    default:
      throw new Error("invalid variant type supplied");
  }

  return (
    <button
      className={`py-3 px-5 font-bold ring-2 !outline-none transition
        disabled:cursor-not-allowed disabled:opacity-40 ${variantClass} ${className}
        hover:shadow-md focus:shadow-md`}
      {...props}
      title={label}
    >
      {children || label}
    </button>
  );
}
