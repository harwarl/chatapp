import { ReactNode, FC } from "react";

type Props = {
  children: ReactNode;
};

const ContentArea: FC<Props> = ({ children }) => {
  return (
    <div className="xl:col-span-5 md:col-span-3 h-full overflow-y-auto text-sky-700">
      {children}
    </div>
  );
};

export default ContentArea;
