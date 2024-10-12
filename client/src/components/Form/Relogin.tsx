import React, {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { User } from "../../utils/types";
import { getUser } from "../../services/userService";
import { signIn } from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { setUser, signout } from "../../store/slice/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PasswordInput from "../inputs/PasswordInput";
import { AiFillLock } from "react-icons/ai";
import BasicButton from "../Button/BasicButton";

type Props = {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  lastUserId: string;
  setLastId: Dispatch<SetStateAction<string>>;
};

const Relogin: FC<Props> = ({ lastUserId, setIsFormOpen, setLastId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [lastUser, setLastUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser();
      setLastUser(result);
    };

    fetchUser();
  }, [lastUserId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const password = await e.target.value;
    if (!password) return;
    const result = await signIn({ email: lastUser?.email!, password });

    if (result.statusCode === "200") {
      setIsFormOpen(false);

      const { id, username, image }: any = jwtDecode(result.access_token);
      Cookies.set("access_token", result.access_token, {
        expires: 3,
      });

      Cookies.set("last_user", id);

      dispatch(
        setUser({
          id,
          username,
          image,
        })
      );

      return setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    e.target.password.value = "";
    toast.error(result.message, {
      duration: 3000,
      position: "bottom-center",
      style: {
        backgroundColor: "#353535",
        color: "#fff",
      },
    });
  };

  const handleClickChange = () => {
    Cookies.remove("access_token");
    Cookies.remove("last_user");
    dispatch(signout());
    setLastId("");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <LazyLoadImage
          className="rounded-full w-44 h-44 object-cover"
          src={lastUser?.image}
          alt="user-pp"
          effect="blur"
        />
        <h1>
          Welcome <strong>{lastUser?.username}</strong>!
        </h1>
      </div>
      <form action="POST" onSubmit={handleSubmit}>
        <PasswordInput
          label="password"
          placeholder="Type your password"
          error={null}
          Icon={AiFillLock}
          refs={{ name: "password" }}
        />
        <div className="mx-auto w-[90%] md:w-[80%]">
          <BasicButton type="submit">Login</BasicButton>
        </div>
      </form>
      <div className="w-full text-center mt-4">
        <BasicButton
          onClick={handleClickChange}
          className="text-lg text-neutral-100 hover:text-neutral-300 duration-200"
        >
          Change Account
        </BasicButton>
        <Toaster />
      </div>
    </div>
  );
};

export default Relogin;
