import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import type { RecentObjectsListProps } from "./RecentObjectsList.types";
import RecentObjectCard from "./RecentObjectCard/RecentObjectCard";

export const RecentObjectsList: React.FC<RecentObjectsListProps> = ({
  objects = [],
  onClick = () => {},
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {/* <Typography variant="h6" textAlign="center" mb={4}>
        Recently Viewed Museum Objects
      </Typography>
      {objects.length ? (
        <Grid container spacing={2}>
          {objects.map((obj) => (
            <Grid key={obj.id}>
              <RecentObjectCard obj={obj} onClick={onClick} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="subtitle1" textAlign="center" mb={4}>
          Your Recently Viewed List is empty. Please Scan your first object.
        </Typography>
      )} */}

      <ImageList cols={isMobile ? 1 : 3} rowHeight={164} variant="quilted">
        {objects.map((obj) => (
          <RecentObjectCard obj={obj} onClick={onClick} />
        ))}
      </ImageList>
    </>
  );
};

export default RecentObjectsList;
