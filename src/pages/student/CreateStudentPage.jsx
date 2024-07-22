import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  FormControlLabel,
  Checkbox,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../contexts/authContext";

// Define the study years as an array
const studyYears = [
  { label: "الصف الثالث الابتدائي", value: "3rd primary" },
  { label: "الصف الأول الثانوي", value: "1st secondary" },
  { label: "الصف الثاني الثانوي", value: "2nd secondary" },
  { label: "الصف الثالث الثانوي", value: "3rd secondary" },
];

const CreateStudent = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [teacherIds, setTeacherIds] = useState([]);
  const [parentNumber, setParentNumber] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [addTeachersDirectly, setAddTeachersDirectly] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { authData } = useAuth();
  const centerId = authData?.centerId;

  useEffect(() => {
    // Fetch existing teachers if needed
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/teachers");
        const filteredTeachers = response.data.filter(
          (teacher) => teacher.center.id === centerId
        );
        setTeachers(filteredTeachers);
      } catch (error) {
        console.error(error);
      }
    };

    if (addTeachersDirectly) {
      fetchTeachers();
    }
  }, [addTeachersDirectly, centerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = addTeachersDirectly
        ? "/students/with-teachers"
        : "/students";

      const response = await axios.post(endpoint, {
        name,
        phoneNumber,
        email,
        studyYear,
        teacherIds,
        parentNumber,
        centerId,
      });
      setSuccessMessage("تم إنشاء الطالب بنجاح");
      setName("");
      setPhoneNumber("");
      setEmail("");
      setStudyYear("");
      setTeacherIds([]);
      setParentNumber("");
    } catch (error) {
      console.error(error);
      setErrorMessage("حدث خطأ أثناء إنشاء الطالب");
    }
  };

  const handleTeacherSelectChange = (event) => {
    setTeacherIds(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          إنشاء طالب
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="الاسم"
            variant="outlined"
            margin="normal"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="رقم الهاتف"
            variant="outlined"
            margin="normal"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            label="رقم الوالد"
            variant="outlined"
            margin="normal"
            fullWidth
            value={parentNumber}
            onChange={(e) => setParentNumber(e.target.value)}
          />
          <TextField
            label="البريد الإلكتروني"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="السنة الدراسية"
            variant="outlined"
            margin="normal"
            fullWidth
            select
            value={studyYear}
            onChange={(e) => setStudyYear(e.target.value)}
          >
            {studyYears.map((year) => (
              <MenuItem key={year.value} value={year.value}>
                {year.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={addTeachersDirectly}
                onChange={(e) => setAddTeachersDirectly(e.target.checked)}
              />
            }
            label="إضافة معلمين مباشرة"
          />
          {addTeachersDirectly && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="teacher-select-label">اختر المعلمين</InputLabel>
              <Select
                labelId="teacher-select-label"
                multiple
                value={teacherIds}
                onChange={handleTeacherSelectChange}
                input={<OutlinedInput label="اختر المعلمين" />}
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) =>
                        teachers.find((teacher) => teacher.id === id)?.name ||
                        ""
                    )
                    .join(", ")
                }
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>
                    <Checkbox checked={teacherIds.includes(teacher.id)} />
                    <ListItemText primary={teacher.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            إنشاء طالب
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

export default CreateStudent;
