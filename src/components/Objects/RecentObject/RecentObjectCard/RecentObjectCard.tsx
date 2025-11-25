import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import type { RecentObjectCardProps } from "./RecentObjectCard.types";
import { Link, useNavigate } from "react-router";
import InfoIcon from "@mui/icons-material/Info";

export const RecentObjectCard: React.FC<RecentObjectCardProps> = ({ obj }) => {
  const navigate = useNavigate();
  return (
    <Link to={`/objects/${obj.id}`}>
      <ImageListItem>
        <img
          srcSet={`${obj.imageUrl}`}
          src={`${obj.imageUrl}`}
          loading="lazy"
          alt={obj.name}
        />

        <ImageListItemBar
          title={obj.name}
          subtitle={obj.metadata}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${obj.name}`}
              onClick={() => navigate(`/objects/${obj.id}`)}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    </Link>
  );
};

export default RecentObjectCard;
