import { FC } from "react";
import { User } from "../../utils/types";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  image?: string;
  name: string;
  participants?: User[] | null;
  isChannel: boolean;
};

const PageInfo: FC<Props> = ({ image, name, participants, isChannel }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div>
            
        </div>
    )
};

export default PageInfo;
