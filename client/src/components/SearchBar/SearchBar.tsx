import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  setSearch: Dispatch<SetStateAction<string>>;
};

const SearchBar: FC<Props> = ({ setSearch }) => {
  return (
    <div className="">
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="e"
        placeholder="search..."
        name="text"
        type="text"
        spellCheck="false"
      />
    </div>
  );
};

export default SearchBar;
