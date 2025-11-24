import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPlatform } from "../store/platform/selectors";
import { getRecentObjects } from "../store/recentObjects/selectors";
import type { AppDispatch } from "../store";
import { useEffect } from "react";
import { addRecentObject } from "../store/recentObjects/recentObjectsSlice";
import ScanButton from "../components/Buttons/ScanButton/ScanButton";
import { mockRecentObjects } from "../dammyData/recentObjects";
import RecentObjectsList from "../components/Objects/RecentObject/RecentObjectsList";
import { Loading } from "../components/ui/Loading";
import OfflinePage from "./OfflinePage";

export const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector(getPlatform);
  const recentObjects = useSelector(getRecentObjects);

  useEffect(() => {
    // dispatch(loadRecentObjects());
    mockRecentObjects.forEach((obj) => dispatch(addRecentObject(obj)));
  }, [dispatch]);

  const handleOpenScanner = () => {
    navigate("/scanner");
  };

  if (loading) {
    return <Loading />;
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
        <RecentObjectsList objects={recentObjects} />
      </Box>
      <ScanButton onClick={handleOpenScanner} />
    </>
  );
};

export default Main;
