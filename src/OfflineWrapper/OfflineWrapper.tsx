import { useEffect, useState } from "react";
import OfflinePage from "../pages/OfflinePage";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import type { OfflineWrapperProps } from "./OfflineWrapper.types";

/**
 * OfflineWrapper checks for internet connection
 * and shows OfflinePage if the user is offline.
 * Automatically responds to changes in network status.
 */
export const OfflineWrapper: React.FC<OfflineWrapperProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  const platformConfig = useSelector(
    (state: RootState) => state.platform.config
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    console.log("No online");
    console.log(platformConfig);
  }

  if (!isOnline && !platformConfig) {
    return <OfflinePage />;
  }

  return <>{children}</>;
};

export default OfflineWrapper;
