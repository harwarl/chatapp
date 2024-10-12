import { FC, ReactNode } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  onClick?: any;
  className?: string;
  children: ReactNode;
};
const BasicButton: FC<Props> = ({
  type = "button",
  onClick,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        className
          ? className
          : "w-full rounded-md bg-neutral-700 text-white p-3 hover:bg-neutral-600 duration-200"
      }`}
    >
      {children}
    </button>
  );
};

export default BasicButton;
