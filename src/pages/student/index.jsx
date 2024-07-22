import React from "react";
import { Container, Typography, Button, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

const StudentsPage = () => {
  return (
    <Container>
      <Box textAlign="center" my={5}>
        <Typography variant="h4" gutterBottom>
          Students Management
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/students/create"
            >
              اضافة طالب
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/students/add-teacher"
            >
              اضافة طالب لمدرس
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/students/all"
            >
              عرض الطلاب
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/students/update-custom-price"
            >
              اضافة سعر مخصص
            </Button>
          </Grid>
          {/* Add more buttons for other CRUD operations */}
        </Grid>
      </Box>
    </Container>
  );
};

export default StudentsPage;
