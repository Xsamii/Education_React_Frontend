import React from "react";
import {
  AppBar,
  Container,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Dashboard, People, School, Event, Home } from "@mui/icons-material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            component={Link}
            to="/"
            sx={{ mr: 2 }}
          >
            <Home fontSize="large" />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Center App
          </Typography>
          <List sx={{ display: "flex" }}>
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/students">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Students" />
            </ListItem>
            <ListItem button component={Link} to="/teachers">
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary="Teachers" />
            </ListItem>
            <ListItem button component={Link} to="/sessions">
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText primary="Sessions" />
            </ListItem>
          </List>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <main style={{ flexGrow: 1, padding: "20px", marginTop: "64px" }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default Layout;
