import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import { PersonAdd, School, Event, Visibility } from "@mui/icons-material";

const FunctionPage = () => {
  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", textAlign: "center" }}
    >
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          component={Link}
          to="/add-student"
          startIcon={<PersonAdd />}
          sx={{ marginBottom: 2 }}
        >
          Add Student
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          component={Link}
          to="/add-teacher"
          startIcon={<School />}
          sx={{ marginBottom: 2 }}
        >
          Add Teacher
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          color="info"
          size="large"
          fullWidth
          component={Link}
          to="/add-session"
          startIcon={<Event />}
          sx={{ marginBottom: 2 }}
        >
          Add Session
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          color="success"
          size="large"
          fullWidth
          component={Link}
          to="/view-sessions"
          startIcon={<Visibility />}
        >
          View Sessions
        </Button>
      </Grid>
    </Grid>
  );
};

export default FunctionPage;
