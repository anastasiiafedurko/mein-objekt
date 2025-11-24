import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Typography,
} from "@mui/material";
import type { RecentObjectCardProps } from "./RecentObjectCard.types";
import { Link, useNavigate } from "react-router";
import InfoIcon from "@mui/icons-material/Info";

export const RecentObjectCard: React.FC<RecentObjectCardProps> = ({
  obj,
  onClick = () => {},
}) => {
  const navigate = useNavigate();
  return (
    // <Link to={`/objects/${obj.id}`}>
    //   <Card elevation={3}>
    //     <CardActionArea onClick={() => onClick(obj)}>
    //       <CardMedia
    //         component="img"
    //         height="180"
    //         image={obj.imageUrl}
    //         alt={obj.name}
    //         sx={{ objectFit: "cover" }}
    //       />
    //       <CardContent>
    //         <Typography variant="subtitle1" align="center">
    //           {obj.name}
    //         </Typography>
    //       </CardContent>
    //     </CardActionArea>
    //   </Card>
    // </Link>
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
