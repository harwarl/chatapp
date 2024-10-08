import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserBox from "../UserBox";
import SearchBar from "../SearchBar";

const Sidebar = () => {
  const location = useLocation();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    //Fetch Channels
  }, []);

  return (
    <aside className={`${location.pathname === "/" ? "block" : "hidden"}`}>
      <UserBox />
      <SearchBar setSearch={setSearch} />
    </aside>
  );
};

export default Sidebar;
