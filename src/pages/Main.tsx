import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlatform } from "../store/platform/selectors";
import { getRecentObjects } from "../store/recentObjects/selectors";
import type { AppDispatch } from "../store";
import { useEffect } from "react";
import { addRecentObject } from "../store/recentObjects/recentObjectsSlice";
import type { ObjectItem } from "../types/ObjectItem";
import ScanButton from "../components/Buttons/ScanButton/ScanButton";
import { mockRecentObjects } from "../dammyData/recentObjects";
import RecentObjectsList from "../components/Objects/RecentObject/RecentObjectsList";

export const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { config, loading } = useSelector(getPlatform);
  const recentObjects = useSelector(getRecentObjects);

  useEffect(() => {
    // dispatch(loadRecentObjects());
    mockRecentObjects.forEach((obj) => dispatch(addRecentObject(obj)));
  }, [dispatch]);

  const handleRecentObject = (obj: ObjectItem) => {
    navigate(`/object/${obj.id}`);
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        p={3}
        sx={{
          // minHeight: "100vh",
          pb: "120px",
        }}
      >
        <RecentObjectsList
          objects={recentObjects}
          onClick={(obj) => handleRecentObject(obj)}
        />
      </Box>

      <ScanButton onClick={() => navigate("/scan")} />
    </>
  );
};

export default Main;
