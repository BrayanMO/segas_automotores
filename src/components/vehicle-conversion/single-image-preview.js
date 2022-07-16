import { Box } from "@mui/material";
import React, { useState } from "react";

export default function SingleImagePreview({ file }) {
  const [previewImage, setPreviewImage] = useState(null);

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    setPreviewImage(reader.result);
  };

  return (
    <Box
      component="img"
      sx={{
        height: 100,
        width: 100,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="Image Certificate"
      src={previewImage}
    ></Box>
  );
}
