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
} from "@mui/material";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../contexts/authContext";

const CreateTeacher = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { authData } = useAuth();
  const centerId = authData?.centerId;

  useEffect(() => {
    // Fetch subjects
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/teachers", {
        name,
        phoneNumber,
        subjectId,
        centerId,
      });
      console.log(response.data);
      setSuccessMessage("تم إنشاء المعلم بنجاح");
      setName("");
      setPhoneNumber("");
      setSubjectId("");
    } catch (error) {
      console.error(error);
      setErrorMessage("حدث خطأ أثناء إنشاء المعلم");
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
          إنشاء معلم
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="subject-select-label">اختر الموضوع</InputLabel>
            <Select
              labelId="subject-select-label"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              inputProps={{
                name: "subjectId",
                id: "subject-select",
              }}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.id}>
                  {subject.name}
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
            إنشاء معلم
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

export default CreateTeacher;
