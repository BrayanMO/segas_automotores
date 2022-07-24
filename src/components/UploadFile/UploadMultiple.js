import PropTypes from "prop-types";

// material-ui
import { styled } from "@mui/material/styles";
import { Box, Button, Stack } from "@mui/material";

// third-party
import { useDropzone } from "react-dropzone";

// project import
import RejectionFiles from "./RejectionFiles";
import PlaceholderContent from "./PlaceholderContent";
import FilesPreview from "./FilesPreview";

const DropzoneWrapper = styled("div")(({ theme }) => ({
  outline: "none",
  padding: theme.spacing(3, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

// ==============================|| UPLOAD - MULTIPLE FILE ||============================== //

const MultiFileUpload = ({ field, error, files, setFieldValue }) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: true,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      if (files) {
        setFieldValue(field, [
          ...files,
          ...acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
        ]);
      } else {
        setFieldValue(
          field,
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }
    },
  });

  const onRemoveAll = () => {
    setFieldValue(field, null);
  };

  const onRemove = (file) => {
    const filteredItems = files && files.filter((_file) => _file !== file);
    setFieldValue(field, filteredItems);
  };

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
        }}
      >
        <input {...getInputProps()} />
        <PlaceholderContent />
      </DropzoneWrapper>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      {files && files.length > 0 && <FilesPreview files={files} onRemove={onRemove} />}
      {files && files.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Eliminar todas
          </Button>
        </Stack>
      )}
    </Box>
  );
};

MultiFileUpload.propTypes = {
  field: PropTypes.string.isRequired,
  error: PropTypes.bool,
  files: PropTypes.array,
  setFieldValue: PropTypes.func,
};

export default MultiFileUpload;
