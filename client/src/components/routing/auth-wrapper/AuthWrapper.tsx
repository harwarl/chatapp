import { FC } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { getAuthState } from "../../../store/selectors/authSelectors";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Paths } from "../../../routes";

const AuthWrapper: FC = () => {
  const { isAuth } = useAppSelector(getAuthState);
  const location = useLocation();

  if (isAuth) {
    return <Outlet />;
  }
  return (
    <Navigate to={Paths.SIGNIN} replace={true} state={{ from: location }} />
  );
};

export default AuthWrapper;
