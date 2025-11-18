import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { RecentObjectCardProps } from "./RecentObjectCard.types";

export const RecentObjectCard: React.FC<RecentObjectCardProps> = ({
  obj,
  onClick = () => {},
}) => {
  return (
    <Card elevation={3}>
      <CardActionArea onClick={() => onClick(obj)}>
        <CardMedia
          component="img"
          height="180"
          image={obj.imageUrl}
          alt={obj.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="subtitle1" align="center">
            {obj.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecentObjectCard;
