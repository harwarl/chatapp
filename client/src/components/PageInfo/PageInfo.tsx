import { FC } from "react";
import { User } from "../../utils/types";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RxDotsVertical } from "react-icons/rx";

type Props = {
  image?: string;
  name: string;
  participants?: User[] | null;
  isChannel: boolean;
};

const PageInfo: FC<Props> = ({ image, name, participants, isChannel }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/chat")
      return navigate("/channel", {
        state: { channelId: location.state.channelId },
      });

    navigate("/chat", { state: { channelId: location.state.channelId } });
  };

  return (
    <div>
      <FaArrowLeft onClick={() => navigate(-1)} />
      {image && <LazyLoadImage src={image} alt="'channel-pp" effect="blur" />}
      <div>
        <p>{name}</p>
        <p>{name}</p>
        {participants && <span>Participants:</span>}
        {participants?.length! > 0 &&
          participants?.map((participants) => {
            return <span key={participants.id}>{participants.username}</span>;
          })}
      </div>
      {isChannel && participants !== null && (
        <div>
          <RxDotsVertical onClick={handleClick} />
        </div>
      )}
    </div>
  );
};

export default PageInfo;
