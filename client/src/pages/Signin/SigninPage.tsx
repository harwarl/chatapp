import Cookies from "js-cookie";
import { useState } from "react";
import Relogin from "../../components/Form/Relogin";
import Logo from "../../assets/brand-logo.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LogInForm from "../../components/Form/LoginForm";
import FormSuccess from "../../components/loading/FormSuccess";

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
                  Login
                </h1>
                <LogInForm setIsFormOpen={setIsFormOpen} />
              </div>
            )}
            {/* <Divider /> */}
          </>
        ) : (
          <FormSuccess message="Logged In" redirectTo="chat" />
        )}
      </div>
    </div>
  );
};

export default SigninPage;
