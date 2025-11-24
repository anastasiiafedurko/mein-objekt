import type { PlatformConfig } from "../../types/PlatformConfig";

export interface PlatformState {
  config: PlatformConfig | null;
  platformId: string | null;
  loading: boolean;
  error: string | null;
}
