import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Grid, Box, Pagination } from "@mui/material";
import usePagination from "src/components/product/pagination/Pagination";
import { map } from "lodash";

const ProductCard = dynamic(() => import("./product-card"));

export default function ProductListResults(props) {
  const { products } = props;
  const [page, setPage] = useState(1);

  const PER_PAGE = 6;

  const count = Math.ceil(products.length / PER_PAGE);
  const _DATA = usePagination(products, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      <Box sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {map(_DATA.currentData(), (product) => (
            <Grid item key={product.id} lg={4} md={6} xs={12}>
              <Link href={`/detail-product/${product.id}`} passHref>
                <ProductCard product={product} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 3,
        }}
      >
        <Pagination
          color="primary"
          size="small"
          count={count}
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </>
  );
}
