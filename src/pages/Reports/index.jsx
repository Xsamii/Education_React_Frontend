import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";

const ReportsPage = () => {
  const history = useHistory();

  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigateTo("/reports/students")}
          >
            Students Report
          </Button>
        </Grid>
        {/* Add more buttons for other reports */}
      </Grid>
    </Container>
  );
};

export default ReportsPage;
