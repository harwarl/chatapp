import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAuthState } from "../../store/selectors/authSelectors";
import { useEffect, useState } from "react";
import { getUser } from "../../services/userService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { User } from "../../utils/types";

const UserBox = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getAuthState).user;
  const [loggedUser, setLoggedUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser();
      setLoggedUser(result.user);
    };

    fetchUser();
  }, [user]);

  return (
    <div>
      <LazyLoadImage
        onClick={() => navigate("/profile", { state: { userId: user?.id } })}
        src={loggedUser?.image}
        alt="user-pp"
        effect="blur"
      />
      <p>{loggedUser?.username}</p>
      {/* DropDown for buttons */}
      <div></div>
    </div>
  );
};

export default UserBox;
