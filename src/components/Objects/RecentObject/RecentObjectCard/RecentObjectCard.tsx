import { IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import type { RecentObjectCardProps } from "./RecentObjectCard.types";
import { useNavigate } from "react-router";
import InfoIcon from "@mui/icons-material/Info";

export const RecentObjectCard: React.FC<RecentObjectCardProps> = ({ obj }) => {
  const navigate = useNavigate();
  return (
    <>
      <ImageListItem>
        <img
          srcSet={`${obj.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          src={`${obj.imageUrl}?w=164&h=164&fit=crop&auto=format`}
          alt={obj.name}
          loading="lazy"
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
    </>
  );
};

export default RecentObjectCard;
