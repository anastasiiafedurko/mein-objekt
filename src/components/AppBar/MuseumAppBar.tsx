import { AppBar, Toolbar, Typography } from "@mui/material";

interface Props {
  museumName: string;
  logoUrl?: string;
}

export const MuseumAppBar = ({ museumName, logoUrl }: Props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Logo"
            style={{ height: 40, marginRight: 10 }}
          />
        )}
        <Typography variant="h6">{museumName}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MuseumAppBar;
