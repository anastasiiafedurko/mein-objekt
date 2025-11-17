import { Button } from "@mui/material";

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function PrimaryButton({ onClick, children }: Props) {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {children}
    </Button>
  );
}
