import React, { useRef, useState } from "react";
import FormWrapper from "./FormWrapper";
import {
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Alert,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const ACCESS_TOKEN_EXPIRE_MINUTES = 30; // should match your backend settings
  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(true);
  const navigation = useNavigate();
  const [backendResponse, setBackEndResponse] = useState({ detail: "Test" });
  const [showSucessfullAlert, setShowSucessfullAlert] = useState(null);

  const handleFormChange = (e) => {
    const value = e.target.value;

    if (e.target.name === "email") {
      setLoginCredentials((prev) => ({
        ...prev,
        email: value,
      }));
    } else if (e.target.name === "password") {
      setLoginCredentials((prev) => ({
        ...prev,
        password: value,
      }));
    }

    console.log(loginCredentials);
  };

  const validateForm = () => {
    const newErrors = {};
    if (loginCredentials.email === "") {
      newErrors.email = "Email is required";
    } else if (loginCredentials.password === "") {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleShowAlert = () => {
    if (showSucessfullAlert === true) {
      return (
        <div style={{ width: "20%", margin: "1.25rem auto" }}>
          <Alert variant="filled" severity="success">
            {backendResponse.detail}
          </Alert>
        </div>
      );
    } else if (showSucessfullAlert === false) {
      return (
        <div style={{ width: "20%", margin: "1.25rem auto" }}>
          <Alert variant="filled" severity="error">
            {backendResponse.detail}
          </Alert>
        </div>
      );
    } else if (showSucessfullAlert === null) {
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign in logic here
    const validationErrors = validateForm();
    const hasErrors = Object.keys(validationErrors).length > 0;
    if (!hasErrors) {
      setHasError(false);
    } else {
      // that means there is an error
      setHasError(true);
      return;
    }



    try {
      const response = await fetch("http://localhost:8000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      });

      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          const data = await response.json();
          console.error("Client Error" | data.detail);
          setBackEndResponse({ detail: data.detail });
          setShowSucessfullAlert(false);
        } else if (response.status >= 500) {
          const data = await response.json();
          console.error("server error");
          setBackEndResponse({ detail: `Server Error | ${data.detail}` });
          setShowSucessfullAlert(false);
        }
      } else {
        const data = await response.json();
        // Cache access, refresh token and time elapsed
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("token_timestamp", Date.now().toString());
        setBackEndResponse({ detail: data.detail });
        setShowSucessfullAlert(true);
        navigation("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally show an error message to the user
    }
  };

  const getValidAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token");

    const tokenTime = parseInt(localStorage.getItem("token_timestamp") || "0");
    const now = Date.now();

    if (accessToken && now - tokenTime < ACCESS_TOKEN_EXPIRE_MINUTES) {
      return accessToken;
    }

    // Token expired — try to refresh using the in-memory refresh token
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      console.warn("No refresh token found. Please log in again.");
      return null;
    }

    const res = await fetch("http://localhost:8000/api/refresh_token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) {
      console.warn("Refresh token expired or invalid");
      return null;
    }

    const data = await res.json();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("token_timestamp", Date.now().toString());
    return data.access_token;
  };

  return (
    <div>
      {handleShowAlert()}
      <FormWrapper>
        <IconButton
          aria-label="back"
          size="medium"
          onClick={() => {
            navigation("/");
          }}
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <Typography
          variant="h2"
          color="primary"
          textAlign="center"
          gutterBottom
        >
          Ensemble
        </Typography>
        <Typography
          fontStyle="italic"
          textAlign="center"
          sx={{ fontSize: 20, color: "black", mb: 3 }}
        >
          Login to your account
        </Typography>

        <Box mb={3}>
          <TextField
            fullWidth
            label="email"
            name="email"
            type="email"
            value={loginCredentials.email || ""}
            onChange={handleFormChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={loginCredentials.password || ""}
            onChange={handleFormChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            margin="normal"
          />
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ bgcolor: "green", ":hover": { bgcolor: "darkgreen" } }}
        >
          Login
        </Button>
        <Typography
          variant="body2"
          textAlign="center"
          fontStyle="italic"
          mt={2}
          >
          Don&apos;t have an account?{' '}
          <span
          onClick={() => navigation('/auth/signup')}
          style={{ color: 'green', cursor: 'pointer', textDecoration: 'underline' }}
          >
          Create one
          </span>
        </Typography>
      </FormWrapper>
    </div>
  );
}
export default SignIn;
