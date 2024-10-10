import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getAuthState } from "../../store/selectors/authSelectors";
import { useEffect, useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import { MdAddToPhotos } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { getUser } from "../../services/userService";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { User } from "../../utils/types";
import { signout } from "../../store/slice/authSlice";

const UserBox = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getAuthState).user;
  const [loggedUser, setLoggedUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUser();
      setLoggedUser(result);
    };

    fetchUser();
  }, [user]);

  return (
    <div className="p-3 flex items-center relative h-22">
      <LazyLoadImage
        onClick={() => navigate("/profile", { state: { userId: user?.id } })}
        className="w-16 h-16 object-cover rounded-full cursor-pointer"
        src={loggedUser?.image}
        alt="user-pp"
        effect="blur"
      />
      <p className="ml-3 text-lg w-32 sm:w-64 md:w-40 lg:w-52 xl:w-56 h-7 overflow-hidden ">
        {loggedUser?.username}
      </p>
      {/* DropDown for buttons */}
      <div className="ml-auto cursor-pointer group">
        <RxDotsVertical className="text-2xl" />
        <div className="absolute group-hover:block hidden text-white w-full lg-max-w-[220px] md:w-auto bg-neutral-800 border border-neutral-900 shadow-md rounded-md z-50 right-0">
          <button
            className="w-full hover:bg-neutral-700 duration-200 py-3 px-8 flex items-center"
            onClick={() => navigate("/create")}
          >
            <MdAddToPhotos className="mr-3" />
            Create Channel
          </button>
          <button
            className="w-full hover:bg-neutral-700 duration-200 py-3 px-8 flex items-center"
            onClick={() => navigate("/addfriend")}
          >
            <IoPersonAddSharp className="mr-3" />
            Add Friend
          </button>
          <button
            className="w-full hover:bg-neutral-700 duration-200 py-3 px-8 flex items-center"
            onClick={() =>
              navigate("/profile", { state: { userId: user?.id } })
            }
          >
            <FaUserFriends className="mr-3" />
            Friends
          </button>
          <button
            className="w-full hover:bg-neutral-700 duration-200 py-3 px-8 flex items-center"
            onClick={() => dispatch(signout())}
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
