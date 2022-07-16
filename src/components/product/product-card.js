import React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";

export default function ProductCard({ product, ...rest }) {
  //console.log(product);
  const { id, url } = JSON.parse(product.imgs_repuestos)[0];

  const strInit = url.slice(0, 49);
  const strEnd = url.slice(49);
  const strResult = `${strInit}q_auto,f_auto/${strEnd}`;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      {...rest}
    >
      <CardContent>
        <Box
          component="img"
          sx={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            height: 233,
            maxWidth: "100%",
            maxHeight: { xs: 233, md: 167 },
          }}
          alt={id}
          src={strResult}
        />
        <Typography align="center" color="textPrimary" gutterBottom variant="h5">
          {product.nombre}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.marca}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        {product.stock > 0 ? (
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                Stock Disponible
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                {product.stock}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Typography
            align="center"
            color="textPrimary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            No cuenta con stock
          </Typography>
        )}
      </Box>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};
