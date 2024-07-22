import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../contexts/authContext";

const AddStudentToTeacher = () => {
  const [searchMethod, setSearchMethod] = useState("id");
  const [studentIdentifier, setStudentIdentifier] = useState("");
  const [student, setStudent] = useState(null);
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { authData } = useAuth();
  const centerId = authData?.centerId;

  useEffect(() => {
    // Fetch teachers
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`/teachers?centerId=${centerId}`);
        setTeachers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeachers();
  }, [centerId]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/students/search`, {
        params: {
          [searchMethod]: studentIdentifier,
        },
      });
      setStudent(response.data);
      setErrorMessage(""); // Clear error message on successful search
    } catch (error) {
      console.error(error);
      setErrorMessage("لم يتم العثور على الطالب");
      setStudent(null); // Clear previous student data on error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student || !teacherId) {
      setErrorMessage("الرجاء تحديد الطالب والمعلم");
      return;
    }
    try {
      const response = await axios.post(`/teachers/${teacherId}/add-student`, {
        studentId: student.id,
      });
      console.log(response.data);
      setSuccessMessage("تم إضافة الطالب إلى المعلم بنجاح");
      setStudentIdentifier("");
      setStudent(null);
      setTeacherId("");
    } catch (error) {
      console.error(error);
      setErrorMessage("حدث خطأ أثناء إضافة الطالب إلى المعلم");
    }
  };

  const handleClose = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          إضافة طالب إلى معلم
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" margin="normal" fullWidth>
            <FormLabel component="legend">اختر طريقة البحث</FormLabel>
            <RadioGroup
              row
              value={searchMethod}
              onChange={(e) => setSearchMethod(e.target.value)}
            >
              <FormControlLabel
                value="id"
                control={<Radio />}
                label="رقم هوية الطالب"
              />
              <FormControlLabel
                value="phoneNumber"
                control={<Radio />}
                label="رقم الهاتف"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            label={searchMethod === "id" ? "رقم هوية الطالب" : "رقم الهاتف"}
            variant="outlined"
            margin="normal"
            fullWidth
            value={studentIdentifier}
            onChange={(e) => setStudentIdentifier(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            onClick={handleSearch}
          >
            بحث عن طالب
          </Button>
          {student && (
            <Typography variant="body1">
              الطالب: {student.name} - {student.phoneNumber}
            </Typography>
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel id="teacher-select-label">اختر المعلم</InputLabel>
            <Select
              labelId="teacher-select-label"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              inputProps={{
                name: "teacherId",
                id: "teacher-select",
              }}
            >
              {teachers.map((teacher) => (
                <MenuItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            إضافة الطالب إلى المعلم
          </Button>
        </form>
      </Box>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddStudentToTeacher;
