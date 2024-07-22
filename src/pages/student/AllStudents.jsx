import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../contexts/authContext";
import studyYearMapping from "../../utils/studyYearMapping";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudyYear, setSelectedStudyYear] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriterion, setSearchCriterion] = useState("id"); // 'id' or 'phoneNumber'
  const [mode, setMode] = useState("filter"); // 'filter' or 'search'
  const { authData } = useAuth();

  useEffect(() => {
    // Fetch students
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `/students/center/${authData.centerId}`
        );
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      }
    };

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

    fetchStudents();
    fetchTeachers();
  }, [authData.centerId]);

  const handleFilter = () => {
    let filtered = students;

    if (selectedStudyYear) {
      filtered = filtered.filter(
        (student) => student.studyYear === selectedStudyYear
      );
    }

    if (selectedTeacherId) {
      filtered = filtered.filter(
        (student) =>
          student.teachers &&
          student.teachers.some((teacher) => teacher.id === selectedTeacherId)
      );
    }

    setFilteredStudents(filtered);
  };

  const handleSearch = () => {
    let filtered = students;

    if (searchTerm) {
      if (searchCriterion === "id") {
        filtered = filtered.filter(
          (student) => student.id.toString() === searchTerm
        );
      } else if (searchCriterion === "phoneNumber") {
        filtered = filtered.filter(
          (student) => student.phoneNumber === searchTerm
        );
      }
    }

    setFilteredStudents(filtered);
  };

  const handleReset = () => {
    setFilteredStudents(students);
    setSelectedStudyYear("");
    setSelectedTeacherId("");
    setSearchTerm("");
  };

  const handleModeChange = (event) => {
    setMode(event.target.value);
    handleReset(); // Reset filters/search term when mode changes
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          عرض الطلاب
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup row value={mode} onChange={handleModeChange}>
            <FormControlLabel
              value="filter"
              control={<Radio />}
              label="تصفية"
            />
            <FormControlLabel value="search" control={<Radio />} label="بحث" />
          </RadioGroup>
        </FormControl>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          {mode === "search" ? (
            <>
              <FormControl
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ mr: 2 }}
              >
                <InputLabel id="search-criterion-select-label">
                  معيار البحث
                </InputLabel>
                <Select
                  labelId="search-criterion-select-label"
                  value={searchCriterion}
                  onChange={(e) => setSearchCriterion(e.target.value)}
                  label="معيار البحث"
                >
                  <MenuItem value="id">رقم الهوية</MenuItem>
                  <MenuItem value="phoneNumber">رقم الهاتف</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="بحث"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  searchCriterion === "id" ? "رقم الهوية" : "رقم الهاتف"
                }
              />
            </>
          ) : (
            <>
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel id="study-year-select-label">
                  السنة الدراسية
                </InputLabel>
                <Select
                  labelId="study-year-select-label"
                  value={selectedStudyYear}
                  onChange={(e) => setSelectedStudyYear(e.target.value)}
                  label="السنة الدراسية"
                >
                  {Object.keys(studyYearMapping).map((year) => (
                    <MenuItem key={year} value={year}>
                      {studyYearMapping[year]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ ml: 2 }}
              >
                <InputLabel id="teacher-select-label">المعلم</InputLabel>
                <Select
                  labelId="teacher-select-label"
                  value={selectedTeacherId}
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  label="المعلم"
                >
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          <Stack direction={"row"} ml={3} mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={mode === "search" ? handleSearch : handleFilter}
            >
              {mode === "search" ? "بحث" : "فلتر"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleReset}
              sx={{ ml: 3 }}
            >
              إعادة ضبط
            </Button>
          </Stack>
        </Box>
        <List>
          {filteredStudents.map((student) => (
            <ListItem key={student.id}>
              <ListItemText
                primary={student.name}
                secondary={`السنة الدراسية: ${
                  studyYearMapping[student.studyYear]
                } | رقم الهاتف: ${student.phoneNumber}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default StudentsPage;
