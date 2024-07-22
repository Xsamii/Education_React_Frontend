import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useAuth } from "../../contexts/authContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (username && password) {
      try {
        await login({ username, password });
        navigate("/functions");
      } catch (error) {
        setErrorMessage(
          "فشل تسجيل الدخول. الرجاء التحقق من بيانات الاعتماد الخاصة بك."
        );
      }
    } else {
      setErrorMessage("الرجاء إدخال اسم المستخدم وكلمة المرور");
    }
  };

  const handleClose = () => {
    setErrorMessage("");
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        style={{ direction: "rtl", textAlign: "right" }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          تسجيل الدخول
        </Typography>
        <TextField
          label="اسم المستخدم"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="كلمة المرور"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
        >
          تسجيل الدخول
        </Button>
      </Box>
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

export default LoginPage;
