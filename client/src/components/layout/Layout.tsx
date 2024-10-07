import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import ContentArea from "../ContentArea";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register") {
    return <>{children}</>;
  }

  return (
    <div>
      <div>
        <ContentArea>{children}</ContentArea>
      </div>
    </div>
  );
};

export default Layout;
