import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { RecentObjectsListProps } from "./RecentObjectsList.types";
import RecentObjectCard from "./RecentObjectCard/RecentObjectCard";

export const RecentObjectsList: React.FC<RecentObjectsListProps> = ({
  objects = [],
  onClick = () => {},
}) => {
  return (
    <>
      <Typography variant="h6" textAlign="center" mb={4}>
        Recently Viewed Museum Objects
      </Typography>
      <Grid container spacing={2}>
        {objects.map((obj) => (
          <Grid key={obj.id}>
            <RecentObjectCard obj={obj} onClick={onClick} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default RecentObjectsList;
