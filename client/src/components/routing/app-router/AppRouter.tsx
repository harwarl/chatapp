import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AuthWrapper from "../auth-wrapper/AuthWrapper";
import { authRoutes, publicRoutes } from "../../../routes";

const AppRouter: FC = () => {
  return (
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
  );
};

export default AppRouter;
