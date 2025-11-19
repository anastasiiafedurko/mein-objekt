export interface PlatformTheme {
  primary: string;
  secondary: string;
  background: string;
}

export interface PlatformConfig {
  name: string;
  logoUrl: string;
  theme: PlatformTheme;
}
