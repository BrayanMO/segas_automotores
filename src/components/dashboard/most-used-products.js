import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";

export default function MostUsedProducts(props) {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [10, 8, 15, 5],
        backgroundColor: ["#3F51B5", "#e53935", "#FB8C00", "#009688"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["Prueba18", "Prueba2", "prueba3", "prueba5"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card {...props}>
      <CardHeader title="Productos más usados" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            maxHeight: 350,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}
