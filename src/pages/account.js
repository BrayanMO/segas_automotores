import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Grid, Typography, CircularProgress } from "@mui/material";
import AccountProfile from "../components/account/account-profile";
import { DashboardLayout } from "../layout/dashboard-layout";
import { useUSer } from "src/context/AuthContext";
import { getMeApi } from "src/Api/AdminApi";

const AccountProfileDetails = dynamic(
  () => import("src/components/account/account-profile-details"),
  {
    loading: () => (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
      </Box>
    ),
  }
);

export default function Account() {
  const [info, setInfo] = useState(undefined);
  const { user, setReloadUser } = useUSer();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(user?.idUser);
      setInfo(response[0] || null);
    })();
  }, [user]);

  if (user === undefined) return null;

  return (
    <DashboardLayout>
      <Head>
        <title>Cuenta | Template Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Cuenta
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={info} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails user={info} setReloadUser={setReloadUser} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
