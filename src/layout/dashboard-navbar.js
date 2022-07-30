import { useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Stack,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell as BellIcon } from "../icons/bell";
import MenuPopover from "../components/menupopover/MenuPopover";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "src/theme";
import { useUSer } from "src/context/AuthContext";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: <HomeIcon />,
    linkTo: "/dashboard",
  },
  {
    label: "Cuenta",
    icon: <PersonIcon />,
    linkTo: "/account",
  },
  {
    label: "Configuracion",
    icon: <SettingsIcon />,
    linkTo: "/settings",
  },
];

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const { user, logout } = useUSer();

  const anchorRef = useRef(null);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "background.default",
              color: "text.primary",
              borderRadius: 1,
            }}
          >
            Tema {theme.palette.mode === "light" ? "Claro" : "Oscuro"}
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <IconButton
            ref={anchorRef}
            onClick={handleOpen}
            sx={{
              p: 0,
              ...(open && {
                "&:before": {
                  zIndex: 1,
                  content: "''",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  position: "absolute",
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                },
              }),
            }}
          >
            <Avatar src="/static/images/avatars/account.png" alt="image-user" />
          </IconButton>

          <MenuPopover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            sx={{
              p: 0,
              mt: 1.5,
              ml: 0.75,
              "& .MuiMenuItem-root": {
                typography: "body2",
                borderRadius: 0.75,
              },
            }}
          >
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                Usuario:
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
                {user?.username}
              </Typography>
            </Box>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Stack sx={{ p: 1 }}>
              {MENU_OPTIONS.map((option) => (
                <NextLink key={option.label} href={option.linkTo} passHref>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText>{option.label}</ListItemText>
                  </MenuItem>
                </NextLink>
              ))}
            </Stack>

            <Divider sx={{ borderStyle: "dashed" }} />

            <MenuItem onClick={logout} sx={{ m: 1 }}>
              Cerrar sesión
            </MenuItem>
          </MenuPopover>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
