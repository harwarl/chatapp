import Cookies from "js-cookie";
import { useState } from "react";
import Relogin from "../../components/Form/Relogin";
import Logo from "../../assets/brand-logo.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LogInForm from "../../components/Form/LoginForm";
import FormSuccess from "../../components/loading/FormSuccess";
import Divider from "../../components/Divider";
import { Link } from "react-router-dom";

const SigninPage = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
  const [lastUser, setLastUser] = useState<string>(
    Cookies.get("last_user") || ""
  );

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="bg-neutral-800 px-3 py-10 shadow-lg rounded-md text-white min-h-[500px] w-full xm:w-[400px] h-full sm:h-auto">
        {isFormOpen ? (
          <>
            {lastUser ? (
              <Relogin
                lastUserId={lastUser}
                setIsFormOpen={setIsFormOpen}
                setLastId={setLastUser}
              />
            ) : (
              <div>
                <LazyLoadImage
                  className="w-[80%] mx-auto border-b border-neutral-700 hidden sm:block"
                  src={Logo}
                  alt="logo"
                  effect="blur"
                />
                <h1 className="text-3xl font-semibold text-center sm:hidden mb-10">
                  {/* TODO: Add the login form component in here */}
                </h1>
                <LogInForm setIsFormOpen={setIsFormOpen} />
              </div>
            )}
            <Divider />
            <div className="text-center w-[90%] md:w-[80%] mx-auto">
              <Link
                className="hover:text-neutral-300 text-neutral-100 duration-200 w-full text-center mx-auto text-lg"
                to="/register"
              >
                Don't have an account? Register
              </Link>
            </div>
          </>
        ) : (
          <FormSuccess message="Logged In" redirectTo="chat" />
        )}
      </div>
    </div>
  );
};

export default SigninPage;
