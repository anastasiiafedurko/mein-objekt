import { ImageList, useMediaQuery, useTheme } from "@mui/material";
import type { RecentObjectsListProps } from "./RecentObjectsList.types";
import RecentObjectCard from "./RecentObjectCard/RecentObjectCard";

export const RecentObjectsList: React.FC<RecentObjectsListProps> = ({
  objects = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <ImageList cols={isMobile ? 1 : 3} rowHeight={164} variant="quilted">
        {objects.map((obj) => (
          <RecentObjectCard obj={obj} key={obj.id} />
        ))}
      </ImageList>
    </>
  );
};

export default RecentObjectsList;
