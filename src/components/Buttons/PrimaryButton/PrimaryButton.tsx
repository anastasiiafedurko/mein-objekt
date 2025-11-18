import { Button } from "@mui/material";
import type { PrimaryButtonProps } from "./PrimaryButton.types";

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
