// material-ui
import { Typography, Stack, CardMedia } from "@mui/material";

// import UploadCover from "/static/images/upload.svg";

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent() {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: "column", md: "row" }}
      sx={{ width: 1, textAlign: { xs: "center", md: "left" } }}
    >
      <CardMedia component="img" image="/static/images/upload.svg" sx={{ width: 150 }} />
      <Stack sx={{ p: 3 }} spacing={1}>
        <Typography variant="h5">Arrastrar y soltar o Seleccionar archivo</Typography>
      </Stack>
    </Stack>
  );
}
