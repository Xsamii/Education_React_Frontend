import React from "react";
import { Container, Typography, Button, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container>
      <Box textAlign="center" my={5}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Center Management System
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/students"
            >
              Students
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/sessions"
            >
              Sessions
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/teachers"
            >
              Teachers
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/reports"
            >
              Reports
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
