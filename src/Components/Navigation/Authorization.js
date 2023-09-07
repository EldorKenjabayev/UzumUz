import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import "./authorization.css";
export default function Authorization({
  setRegister,
  setSnucbarauthorization,
  setOpen,
  setLoggedIn,
  setLoggedInUserName,
  ProfileUser,
  setProfileUser,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    axios.get("http://localhost:3001/users").then((res) => {
      setProfileUser(res.data);
      const foundUser = res.data.find(
        (user) => user.username === username && user.password === password
      );
      if (foundUser) {
        setLoginError(false);
        setSnucbarauthorization(true);
        setOpen(false);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("loggedInUserName", foundUser.name);
        setLoggedInUserName(foundUser.name);
        setLoggedIn(true);
        setProfileUser(foundUser);
        console.log(ProfileUser);
      } else {
        setLoginError(true);
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" className="sigin" variant="h4">
          Kirish
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Foydalanuvchi nomi"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Parol"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            required
            autoComplete="AbsEw123@"
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
          />
          <p
            style={{
              textAlign: "center",
              cursor: "pointer",
              color: "blue",
              userSelect: "none",
            }}
            onClick={() => setRegister(true)}
          >
            Roʻyxatdan oʻtish
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                background: "#7000FF",
                "&:hover": {
                  background: "#7000F0",
                },
                width: "80%",
                borderRadius: "10px",
              }}
            >
              Kirish
            </Button>
          </div>
          <br />
          {loginError && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              padding={"10px 0"}
            >
              Siz kiritgan foydalanuvchi nomi yoki parol noto'g'ri. Iltimos,
              yana bir bor urinib ko'ring.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
