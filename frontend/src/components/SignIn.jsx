import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import {
    Typography,
    TextField,
    Button,
    Box, 
    IconButton
} from '@mui/material'

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from 'react-router-dom';


function SignIn() {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(true);
  const navigation = useNavigate();

  
  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;


    if (e.target.name === 'email') {
      setLoginCredentials((prev) => ({
      ...prev,
      email: value
    }));
    } else if (e.target.name === 'password') {
      setLoginCredentials((prev) => ({
      ...prev,
      password: value
    }));
}

    console.log(loginCredentials)
  }

  const validateForm = () => {
    const newErrors = {};
    if (loginCredentials.email === ""){
      newErrors.email = 'Email is required'
    } else if (loginCredentials.password){
      newErrors.password = 'Password is required'
    }
    return newErrors
    }
    
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign in logic here
    const validationErrors = validateForm();
    const hasErrors = Object.keys(validationErrors).length > 0;
    if (!hasErrors){
      setHasError(false)
    } else {
    // that means there is an error 
      setHasError(true)
    }

    //Send form data to backend
    const formData = JSON.stringify(loginCredentials)

    try {
      const response = await fetch('http://localhost:8000/api/create_new_user', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert(response.json().detail)
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('User created sucessfully')

    } catch (error) {
      console.error('Error submitting form:', error);
    // Optionally show an error message to the user
    }

  };

    return (
        <FormWrapper>

          <IconButton
          aria-label="back"
          size="medium"
          onClick={() => {
              navigation('/')
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
                value={loginCredentials.password || ""}
                onChange={handleFormChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
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
                onSubmit={handleSubmit}
                sx={{ bgcolor: "green", ":hover": { bgcolor: "darkgreen" } }}
              >
                Login
              </Button>

        </FormWrapper>
    );
  }
export default SignIn;