import React from "react";
import { ImageList, ImageListItem } from "@mui/material";

export default function MultipleImagePreview({ source }) {
  return (
    <ImageList
      sx={{ width: { xs: "500", md: "500", lg: "200" }, height: 160 }}
      cols={4}
      gap={5}
      rowHeight={160}
    >
      {source.map((photo) => (
        <ImageListItem key={photo}>
          <img src={photo} alt="" loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
