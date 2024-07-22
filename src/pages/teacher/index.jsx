import React from "react";
import { Container, Typography, Button, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

const TeachersPage = () => {
  return (
    <Container>
      <Box textAlign="center" my={5}>
        <Typography variant="h4" gutterBottom>
          Teachers Management
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/teachers/create"
            >
              Create Teacher
            </Button>
          </Grid>
          {/* Add more buttons for other CRUD operations */}
        </Grid>
      </Box>
    </Container>
  );
};

export default TeachersPage;
