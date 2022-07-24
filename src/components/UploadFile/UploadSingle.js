import PropTypes from "prop-types";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Button, Stack, IconButton } from "@mui/material";
import CloseCircleFilled from "@mui/icons-material/Cancel";

// third-party
import { useDropzone } from "react-dropzone";

// project import
import RejectionFiles from "./RejectionFiles";
import PlaceholderContent from "./PlaceholderContent";

const DropzoneWrapper = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ==============================|| UPLOAD - SINGLE FILE ||============================== //
const SingleFileUpload = ({ field, error, file, setFieldValue }) => {
  const theme = useTheme();

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFieldValue(
        field,
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs =
    file &&
    file.map((item) => (
      <img
        key={item.name}
        alt={item.name}
        src={item.preview}
        style={{
          top: 8,
          left: 5,
          borderRadius: 2,
          position: "absolute",
          display: "inline-flex",
          verticalAlign: "text-top",
          width: "calc(100% - 16px)",
          height: "calc(100% - 16px)",
          background: theme.palette.background.paper,
        }}
        onLoad={() => {
          URL.revokeObjectURL(item.preview);
        }}
      />
    ));

  const onRemove = () => {
    setFieldValue(field, null);
  };

  const closed = file && file.length > 0 && (
    <IconButton
      size="small"
      color="secondary"
      onClick={onRemove}
      sx={{
        top: 10,
        right: 10,
        position: "absolute",
      }}
    >
      <CloseCircleFilled style={{ fontSize: "1.15rem" }} />
    </IconButton>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && {
            padding: "12% 0",
          }),
        }}
      >
        <input {...getInputProps()} />
        <PlaceholderContent />
        {thumbs}
        {closed}
      </DropzoneWrapper>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
    </Box>
  );
};

SingleFileUpload.propTypes = {
  field: PropTypes.string.isRequired,
  error: PropTypes.bool,
  file: PropTypes.array,
  setFieldValue: PropTypes.func,
};

export default SingleFileUpload;
