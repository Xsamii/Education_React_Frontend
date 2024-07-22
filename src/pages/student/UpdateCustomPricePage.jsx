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

const UpdateCustomPricePage = () => {
  const [teacherId, setTeacherId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("id");
  const [student, setStudent] = useState(null);
  const [customPrice, setCustomPrice] = useState("");
  const [teachers, setTeachers] = useState([]);
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

    fetchTeachers();
  }, [authData.centerId]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/students?${searchType}=${searchTerm}`);
      setStudent(response.data);
    } catch (error) {
      console.error("Failed to search student:", error);
      setErrorMessage("حدث خطأ أثناء البحث عن الطالب");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!student || !teacherId) {
        throw new Error("Student and teacher must be selected");
      }
      const response = await axios.post("/teachers/add-custom-price", {
        studentId: student.id,
        teacherId: parseInt(teacherId, 10),
        customPrice: parseFloat(customPrice),
      });
      setSuccessMessage("تم تحديث السعر المخصص بنجاح");
      setTeacherId("");
      setSearchTerm("");
      setSearchType("id");
      setStudent(null);
      setCustomPrice("");
    } catch (error) {
      console.error("Failed to update custom price:", error);
      setErrorMessage("حدث خطأ أثناء تحديث السعر المخصص");
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
          تحديث السعر المخصص
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
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="search-type-select-label">بحث بواسطة</InputLabel>
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
          <TextField
            label="مصطلح البحث"
            variant="outlined"
            margin="normal"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            fullWidth
            sx={{ mt: 2 }}
          >
            بحث
          </Button>
          {student && (
            <Box mt={4}>
              <Typography variant="h6">تفاصيل الطالب</Typography>
              <Typography>الاسم: {student.name}</Typography>
              <Typography>رقم الهوية: {student.id}</Typography>
              <Typography>رقم الهاتف: {student.phoneNumber}</Typography>
              <TextField
                label="السعر المخصص"
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                تحديث السعر
              </Button>
            </Box>
          )}
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

export default UpdateCustomPricePage;
