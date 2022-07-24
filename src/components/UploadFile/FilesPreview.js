import PropTypes from "prop-types";

import { List, ListItem, IconButton } from "@mui/material";
// Icons
import FileFilled from "@mui/icons-material/InsertDriveFile";
import CloseCircleFilled from "@mui/icons-material/Cancel";

// Dropzone Data
import getDropzoneData from "./getDropzoneData";

// ==============================|| MULTI UPLOAD - PREVIEW ||============================== //
export default function FilesPreview({ files, onRemove }) {
  const hasFile = files.length > 0;

  return (
    <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
      {files.map((file, index) => {
        const { key, preview, type } = getDropzoneData(file, index);
        // console.log(type);

        return (
          <ListItem
            key={key}
            sx={{
              p: 0,
              m: 0.5,
              width: 80,
              height: 80,
              position: "relative",
              display: "inline-flex",
              verticalAlign: "text-top",
            }}
          >
            {type?.includes("image") && (
              <img alt="preview" src={preview} style={{ width: "100%" }} />
            )}
            {!type?.includes("image") && (
              <FileFilled style={{ width: "100%", fontSize: "1.5rem" }} />
            )}

            {onRemove && (
              <IconButton
                size="small"
                color="secondary"
                onClick={() => onRemove(file)}
                sx={{
                  top: -10,
                  right: -10,
                  position: "absolute",
                }}
              >
                <CloseCircleFilled style={{ fontSize: "1.15rem" }} />
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}

FilesPreview.propTypes = {
  files: PropTypes.array,
  onRemove: PropTypes.func,
};
