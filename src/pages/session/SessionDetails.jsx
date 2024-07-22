import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";

const SessionDetailsPage = () => {
  const { sessionId } = useParams();
  const [attendedStudents, setAttendedStudents] = useState([]);
  const [notAttendedStudents, setNotAttendedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await axios.get(`/sessions/${sessionId}/students`);
        setAttendedStudents(response.data.attended);
        setNotAttendedStudents(response.data.notAttended);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch session details:", error);
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  const handleMarkAttendance = async (studentId) => {
    try {
      await axios.post(
        `/sessions/${sessionId}/students/${studentId}/attendance`
      );
      setSuccessMessage("تم تحديث الحضور بنجاح");
      // Refresh the data
      const response = await axios.get(`/sessions/${sessionId}/students`);
      setAttendedStudents(response.data.attended);
      setNotAttendedStudents(response.data.notAttended);
    } catch (error) {
      console.error("Failed to mark attendance:", error);
      setErrorMessage("حدث خطأ أثناء تحديث الحضور");
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/students/search`, {
        params: {
          [searchType]: searchTerm,
        },
      });
      const student = response.data;
      if (student) {
        const studentSession = notAttendedStudents.find(
          (s) => s.id === student.id
        );
        if (studentSession) {
          await handleMarkAttendance(student.id);
        } else {
          setErrorMessage("الطالب غير مسجل في هذه الجلسة");
        }
      }
    } catch (error) {
      console.error("Failed to search student:", error);
      setErrorMessage("حدث خطأ أثناء البحث عن الطالب");
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          تفاصيل الجلسة
        </Typography>
        <Box mb={4}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="مصطلح البحث"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="search-type-select-label">
                  بحث بواسطة
                </InputLabel>
                <Select
                  labelId="search-type-select-label"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  label="بحث بواسطة"
                >
                  <MenuItem value="id">رقم الهوية</MenuItem>
                  <MenuItem value="phoneNumber">رقم الهاتف</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
                sx={{ height: "100%" }}
              >
                بحث
              </Button>
            </Grid>
          </Grid>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">الطلاب الحاضرين</Typography>
              <List>
                {attendedStudents.map((student) => (
                  <ListItem key={student.id} divider>
                    <ListItemText
                      primary={student.name}
                      secondary={`السعر: ${student.customPrice}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">الطلاب الغير حاضرين</Typography>
              <List>
                {notAttendedStudents.map((student) => (
                  <ListItem key={student.id} divider>
                    <ListItemText primary={student.name} />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleMarkAttendance(student.id)}
                    >
                      تعليم كحاضر
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default SessionDetailsPage;
