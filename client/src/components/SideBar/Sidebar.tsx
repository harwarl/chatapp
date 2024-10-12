import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserBox from "../UserBox";
import SearchBar from "../SearchBar";
import { useAppSelector } from "../../hooks/redux";
import { getAuthState } from "../../store/selectors/authSelectors";
import { getChannels } from "../../store/selectors/channelSelectors";
import { Channel, Message } from "../../utils/types";
import { getChannelByUser } from "../../services/channelService";
import ChannelBox from "../ChannelBox";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAppSelector(getAuthState);
  const { refresh } = useAppSelector(getChannels);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [lastMessages, setLastMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setIsPending(true);
    const fetchChannels = async () => {
      // const result = await getChannelByUser(user?.id!);
      // setChannels(result.channels);
      setChannels([]);
      // setLastMessages(result.lastMessages);
      setLastMessages([]);
      setIsPending(false);
    };

    fetchChannels();
  }, [user?.id, refresh]);

  return (
    <aside className={`${location.pathname === "/" ? "block" : "hidden"}`}>
      <UserBox />
      <SearchBar setSearch={setSearch} />
      <div>
        {isPending ? (
          <div>
            <p>loading...</p>
          </div>
        ) : channels.length > 0 ? (
          channels.map((channel, index) => {
            return (
              <ChannelBox
                key={channel.id}
                channel={channel}
                userId={user?.id!}
                lastMessage={lastMessages[index]}
                search={search}
              />
            );
          })
        ) : (
          <p className="text-neutral-500 text-center mt-3">
            Create a channel now and start chatting
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
