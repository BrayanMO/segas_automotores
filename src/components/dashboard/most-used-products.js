import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";
import { randomColor } from "src/utils/randomColor";
import { map, merge, flatten, compact } from "lodash";

export default function MostUsedProducts(props) {
  const { callback } = props;
  const theme = useTheme();

  const merged = merge(
    compact(
      flatten(
        map(callback, (item) =>
          map(item.products, (pro) => {
            const data = pro.id && {
              id: pro.id,
              cant: pro.cantidad,
              name: pro.nombre,
            };
            return data;
          })
        )
      )
    )
  );

  //sumar las cantidades con el identificador igual  y retornar un array con los ids y el nombre del producto
  const sumar = merged.reduce((acc, cur) => {
    const existe = acc.find((item) => item.id === cur.id);
    if (existe) {
      existe.cant += cur.cant;
    } else {
      acc.push({ id: cur.id, name: cur.name, cant: cur.cant });
    }
    return acc;
  }, []);

  const data = {
    labels: map(sumar, (item) => item.name),
    datasets: [
      {
        data: map(sumar, (item) => item.cant),
        backgroundColor: map(sumar, (item) => randomColor(theme)),
        hoverBackgroundColor: map(sumar, (item) => randomColor(theme)),
        borderColor: "rgba(255,255,255,0.7)",
        borderWidth: 2,
      },
    ],
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
