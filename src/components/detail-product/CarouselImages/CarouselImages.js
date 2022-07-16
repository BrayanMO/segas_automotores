import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, MobileStepper, Button, Modal, Fade, Backdrop } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function CarouselImages(props) {
  const { collage } = props;

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [urlImage, setUrlImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const maxSteps = collage.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const openImage = (url) => {
    setUrlImage(url);
    setShowModal(true);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {collage.map((item, index) => {
          const strCerti = item.url;
          const strInit = strCerti.slice(0, 46);
          const strEnd = strCerti.slice(46);
          const strResultCertifi = `${strInit}q_auto,f_auto/${strEnd}`;

          return (
            <Box key={item.id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height: 255,
                    display: "block",
                    maxWidth: "100%",
                    overflow: "hidden",
                    my: 3,
                  }}
                  src={strResultCertifi}
                  alt={item.id}
                  onClick={() => openImage(strResultCertifi)}
                />
              ) : null}
            </Box>
          );
        })}
      </AutoPlaySwipeableViews>
      <MobileStepper
        sx={{ my: 3 }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Siguiente
            {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Atras
          </Button>
        }
      />
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box
            component="img"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "80%",
              maxHeight: "80%",
              display: "block",
              overflow: "hidden",
            }}
            src={urlImage}
          />
        </Fade>
      </Modal>
    </Box>
  );
}
