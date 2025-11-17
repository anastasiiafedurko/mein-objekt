import CircularProgress from "@mui/material/CircularProgress";

export function Loading() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "40px 0",
      }}
    >
      <CircularProgress />
    </div>
  );
}