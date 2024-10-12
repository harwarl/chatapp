import { SetStateAction, Dispatch, FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signIn } from "../../services/authService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { setUser } from "../../store/slice/authSlice";
import toast, { Toaster } from "react-hot-toast";
import TextInput from "../inputs/TextInput";

type Props = {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
};

const LogInForm: FC<Props> = ({ setIsFormOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const result = await signIn({ email: data.email, password: data.password });
    if (result.statusCode === "200") {
      setIsFormOpen(false);

      const { id, username, image }: any = jwtDecode(result.access_token);
      Cookies.set("access_token", result.access_token, { expires: 3 });
      Cookies.set("last_user", id);

      dispatch(
        setUser({
          username,
          id,
          image,
        })
      );

      return setTimeout(() => {
        return navigate("/");
      }, 2000);
    }

    reset();
    toast.error(result.message, {
      duration: 3000,
      position: "bottom-center",
      style: {
        backgroundColor: "#353535",
        color: "#fff",
      },
    });
  };

  return (
    <form method="POST" name="form" onSubmit={handleSubmit(onSubmit)}>
      {/* TODO: Add the inputs for the form */}
      {/* <TextInput label="Email" placeholder="Type Your email" /> */}
    </form>
  );
};

export default LogInForm;
