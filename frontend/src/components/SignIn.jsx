import React, { useState } from 'react';
import FormWrapper from './FormWrapper';
import {
    Typography,
    TextField,
    Button,
    Box
} from '@mui/material'


function SignIn() {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(true);

  
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
    
  
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle sign in logic here
        const hasErrors = validateForm();
        if (!hasErrors){
          setHasError(false)
        } else {
          // that means there is an error 
          setHasError(true)
        }
        
    };

    return (
        <FormWrapper>
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
                sx={{ bgcolor: "green", ":hover": { bgcolor: "darkgreen" } }}
              >
                Login
              </Button>

        </FormWrapper>
    );
  }
export default SignIn;