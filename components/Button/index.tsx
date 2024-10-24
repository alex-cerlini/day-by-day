import { ButtonHTMLAttributes } from "react";

export const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="bg-blue-300 px-4 py-2 rounded-xl text-white font-bold"
      {...props}
    >
      {children}
    </button>
  );
};
