import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { map } from "lodash";

export default function ProductStock(props) {
  const { callback } = props;

  return (
    <Card {...props}>
      <CardHeader title="Stock de productos" />
      <Divider />
      <Box>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
          }}
          subheader={<li />}
        >
          {map(callback, (product, i) => (
            <ListItem divider={i < callback.length - 1} key={product.id}>
              <ul>
                <NextLink href={`/detail-product/${product.id}`} passHref>
                  <ListSubheader>
                    {`Repuesto: ${product.nombre}`}
                    <ListItemText
                      primary={`Marca: ${product.marca}`}
                      secondary={`Stock ${product.stock}`}
                    />
                  </ListSubheader>
                </NextLink>
              </ul>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <NextLink href="/products" passHref>
          <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
            Ver Todos
          </Button>
        </NextLink>
      </Box>
    </Card>
  );
}
