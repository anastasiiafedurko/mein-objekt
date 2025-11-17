import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface Props {
  title: string;
  imageUrl: string;
  description?: string;
}

export default function ObjectCard({ title, imageUrl, description }: Props) {
  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {description && <Typography variant="body2">{description}</Typography>}
      </CardContent>
    </Card>
  );
}
