import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";

export default function TotalCustomers(props) {
  const { callback } = props;

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent sx={{ display: "flex", alignItems: "center", height: "100%" }}>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Total de Clientes
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {callback?.total_clients}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
