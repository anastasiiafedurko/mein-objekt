import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../store";
import { Loading } from "../components/ui/Loading";
import Chat from "../components/Chat/Chat";
import ChatButton from "../components/Buttons/ChatButton/ChatButton";
import { BackButton } from "../components/Buttons/BackButton/BackButton";
import { mockRecentObjects } from "../dammyData/recentObjects";
import { setSelectedObject } from "../store/selectedObject/selectedObjectSlice";
import OfflinePage from "./OfflinePage";

export const ObjectDetailsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { objectId } = useParams<{ objectId: string }>();
  const { selectedObject, loading } = useSelector(
    (state: RootState) => state.selectedObject
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openChat, setOpenChat] = useState(false);

  const toggleDrawer = (value: boolean) => () => {
    setOpenChat(value);
  };

  const isOnline = navigator.onLine;

  useEffect(() => {
    // if (objectId) dispatch(fetchObject(objectId));
    if (!objectId) return;

    const foundObject = mockRecentObjects.find((obj) => obj.id === objectId);

    if (foundObject) {
      dispatch(setSelectedObject(foundObject));
    } else {
      if (!isOnline) return;

      dispatch(setSelectedObject(null));
    }
  }, [dispatch, objectId]);

  if (loading) return <Loading />;

  if (!isOnline && !selectedObject) {
    return <OfflinePage />;
  }

  if (!selectedObject) {
    return <Typography variant="h4">Object not found</Typography>;
  }

  return (
    <Box p={3}>
      <Box position="relative" mb={3}>
        <BackButton />
        <Card>
          <CardMedia
            component="img"
            image={selectedObject.imageUrl}
            alt={selectedObject.name}
            sx={{ objectFit: "contain", maxHeight: 400 }}
          />
        </Card>
      </Box>

      <Typography variant="h5" gutterBottom>
        {selectedObject.name}
      </Typography>
      {selectedObject.metadata && (
        <Typography variant="body2" gutterBottom>
          {selectedObject.metadata}
        </Typography>
      )}

      <Typography variant="body1">{selectedObject.description}</Typography>

      <Box position="fixed" bottom={16} right={16} zIndex={1000}>
        <ChatButton onClick={toggleDrawer(true)} />
      </Box>

      <SwipeableDrawer
        anchor="right"
        open={openChat}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        slotProps={{
          paper: {
            sx: {
              width: isMobile ? "90%" : "50%",
              maxWidth: "100%",
            },
          },
        }}
      >
        <Box p={2} height="100%" display="flex" flexDirection="column">
          {selectedObject && (
            <Chat objectId={selectedObject.id} onClose={toggleDrawer(false)} />
          )}
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default ObjectDetailsPage;
