import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../contexts/authContext";

const CreateSessionPage = () => {
  const [teacherId, setTeacherId] = useState("");
  // const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { authData } = useAuth();

  useEffect(() => {
    // Fetch teachers
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          `/teachers/center/${authData.centerId}`
        );
        setTeachers(response.data);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };

    // Fetch subjects
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    fetchTeachers();
    fetchSubjects();
  }, [authData.centerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/sessions", {
        teacherId: parseInt(teacherId, 10),
        // subjectId: parseInt(subjectId, 10),
        date,
        time,
        price: parseFloat(price),
      });
      setSuccessMessage("تم إنشاء الجلسة بنجاح");
      setTeacherId("");
      // setSubjectId("");
      setDate("");
      setTime("");
      setPrice("");
    } catch (error) {
      console.error("Failed to create session:", error);
      setErrorMessage("حدث خطأ أثناء إنشاء الجلسة");
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          إنشاء جلسة
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="teacher-select-label">المعلم</InputLabel>
            <Select
              labelId="teacher-select-label"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              label="المعلم"
            >
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="subject-select-label">المادة</InputLabel>
            <Select
              labelId="subject-select-label"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              label="المادة"
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <TextField
            label="تاريخ الجلسة"
            type="date"
            variant="outlined"
            margin="normal"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="وقت الجلسة"
            type="time"
            variant="outlined"
            margin="normal"
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="السعر"
            type="number"
            variant="outlined"
            margin="normal"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            إنشاء الجلسة
          </Button>
        </form>
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

export default CreateSessionPage;
