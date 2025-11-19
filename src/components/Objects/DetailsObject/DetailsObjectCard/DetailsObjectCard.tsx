import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { ObjectCardProps } from "./DetailsObjectCard.types";

export const ObjectCard: React.FC<ObjectCardProps> = ({
  title,
  imageUrl,
  description,
}) => {
  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {description && <Typography variant="body2">{description}</Typography>}
      </CardContent>
    </Card>
  );
};

export default ObjectCard;
