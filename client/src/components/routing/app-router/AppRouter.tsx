import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthWrapper from "../auth-wrapper/AuthWrapper";
import { authRoutes, publicRoutes } from "../../../routes";

const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthWrapper />}>
          {authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
