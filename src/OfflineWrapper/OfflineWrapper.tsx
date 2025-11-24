import { useEffect, useState, type ReactNode } from "react";
import OfflinePage from "../pages/OfflinePage";

interface OfflineWrapperProps {
  children: ReactNode;
}

/**
 * OfflineWrapper checks for internet connection
 * and shows OfflinePage if the user is offline.
 * Automatically responds to changes in network status.
 */
export const OfflineWrapper: React.FC<OfflineWrapperProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

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
    return <OfflinePage />;
  }

  return <>{children}</>;
};

export default OfflineWrapper;
