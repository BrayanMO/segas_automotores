import Head from "next/head";
import dynamic from "next/dynamic";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../layout/dashboard-layout";
const SettingsPassword = dynamic(() => import("src/components/settings/settings-password"));

export default function Settings() {
  return (
    <DashboardLayout>
      <Head>
        <title>Configuracion | Template Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Configuracion
          </Typography>
          <Box sx={{ pt: 3 }}>
            <SettingsPassword />
          </Box>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
