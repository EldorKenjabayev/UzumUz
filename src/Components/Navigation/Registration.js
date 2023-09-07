import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import "./registration.css";
export default function Registration({  setSnucbarpen, setRegister }) {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateName(fullName)) {
      setFullNameError(true);
      return;
    } else {
      setFullNameError(false);
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9A-Za-z!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }

    const newUser = {
      name: fullName,
      username: userName,
      password: password,
      email: email,
    };

    axios
      .post("http://localhost:3001/users", newUser)
      .then((res) => {
        console.log("Foydalanuvchi serverga yuborildi:", res.data);
        setFullName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRegister(false);
        setSnucbarpen(true);
        localStorage.setItem("user", JSON.stringify(newUser));
      })
      .catch((error) => {
        console.error(
          "Foydalanuvchini serverga yuborishda xato yuzaga keldi:",
          error
        );
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setFullNameError(false);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Z][a-zA-Z ]*$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <h2 className="regissterHead">Ro'yxatdan o'tish</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Ism"
            variant="outlined"
            fullWidth
            value={fullName}
            onChange={handleFullNameChange}
            required
            margin="normal"
            error={fullNameError}
            helperText={
              fullNameError
                ? "Foydalanuvchi ismi bosh harflar bilan va raqamlarsiz boshlanishi kerak !"
                : ""
            }
          />

          <TextField
            label="Foydalanuvchi nomi"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            label="elektron manzil"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            required
            margin="normal"
            error={emailError}
            helperText={emailError ? "Email tog`ri formatda yozilmagan" : ""}
          />

          <TextField
            label="Parol"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type={showPassword ? "text" : "password"}
            margin="normal"
            InputProps={{
              endAdornment: (
                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
              ),
            }}
            error={passwordError}
            helperText={
              passwordError
                ? "Parol kamida bitta raqam, bitta katta va kichik harf va kamida 8 ta belgidan iborat boʻlishi kerak"
                : ""
            }
          />

          <TextField
            label="Parolni tasdiqlang"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            type={showConfirmPassword ? "text" : "password"}
            margin="normal"
            InputProps={{
              endAdornment: (
                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </span>
              ),
            }}
            error={passwordError}
            helperText={passwordError ? "Parol bir biriga mos kelmaydi !" : ""}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              className="btnRegister"
              type="submit"
              sx={{
                margin: "12px 0",
                background: "#7000FF",
                padding: "10px 20px",
                "&:hover": {
                  background: "#7000F0",
                },
                width: "80%",
                borderRadius: "10px",
              }}
              variant="contained"
              color="primary"
            >
              Ro'yxatdan o'tish
            </Button>
          </div>
        </form>
        <p
          style={{
            textAlign: "center",
            cursor: "pointer",
            color: "blue",
            userSelect: "none",
          }}
          onClick={() => setRegister(false)}
        >
          Akkauntingiz bormi ?
        </p>
      </Container>
    </ThemeProvider>
  );
}
