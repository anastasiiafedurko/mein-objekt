import type { PlatformConfig } from "../../types/PlatformConfig";

export interface PlatformState {
  config: PlatformConfig | null;
  loading: boolean;
  error: string | null;
}
