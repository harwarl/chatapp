import { PropsWithChildren, FC } from "react";
import { Container } from "@mui/material";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <Container component="main">{children}</Container>;
};

export default Layout;
