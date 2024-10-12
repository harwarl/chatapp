import { IconType } from "react-icons";
import { FC } from "react";
type Props = {
  Icon: IconType;
  text: string;
  type: "button" | "submit" | "reset";
  handleClick: VoidFunction;
  isTextCanClosed: boolean;
  isPending?: boolean;
};

const IconButton: FC<Props> = ({
  Icon,
  text,
  type,
  handleClick,
  isTextCanClosed,
  isPending,
}) => {
  return <button>{isPending ? <div></div> : <div></div>}</button>;
};

export default IconButton;
