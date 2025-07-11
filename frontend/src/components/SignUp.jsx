import fonts from '../fonts/fonts'
import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
} from '@mui/material';
import PersonalDetailsForm from '../components/SignUpForm/PersonalDetailsForm';
import CollegeDetailsForm from '../components/SignUpForm/CollegeDetailsForm';
import SignUpContext from '../context/SignUpContext';

function SignUp() {
  const [currPos, setCurrPos] = useState(0);
  const [errors, setErrors] = useState({});
  const [personalFormHasError, setPersonalFormHasError] = useState(true);

  const [personalFormData, setPersonalFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (e) => {
    if (currPos === 0) {
      const { name, value } = e.target;
      setPersonalFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormDisplay = () => {
    if (currPos === 0) {
      return <PersonalDetailsForm />;
    } else if (currPos === 1) {
      return <CollegeDetailsForm />;
    }
  };




  const validatePersonalForm = () => {
        const newErrors = {};
        if (!personalFormData.email) newErrors.email = "Email is required";
        if (!personalFormData.username) newErrors.username = "Username is required";
        if (!personalFormData.password) newErrors.password = "Password is required";
        if (personalFormData.password !== personalFormData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";
        setErrors(newErrors);
        return newErrors
    };

    const OnContinueClick = () => {
    if (currPos === 0){
      const validationErrors = validatePersonalForm();
      const hasErrors = Object.keys(validationErrors).length > 0;

      if (!hasErrors) {
        setPersonalFormHasError(false);
        alert("you good boss");
        setCurrPos(currPos + 1);
        } else {
            setPersonalFormHasError(true);
        }
    }

  }


  return (
    <SignUpContext.Provider
      value={{
        errors,
        personalFormData,
        setPersonalFormData,
        handleFormChange,
        setCurrPos,
      }}
    >
      <Box sx={{ maxWidth: 500, margin: '40px auto' }}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 4,
            backgroundColor: '#f9f9f9',
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h2" color="primary" textAlign="center" gutterBottom>
              Ensemble
            </Typography>
            <Typography
              fontStyle="italic"
              textAlign="center"
              sx={{ fontSize: 20, color: 'black', mb: 3 }}
            >
              Create your Account
            </Typography>

            <Box mb={3}>{handleFormDisplay()}</Box>

            <Stack direction="row" spacing={2} justifyContent="space-between">
              {currPos === 1 && (
                <Button variant="outlined" onClick={() => setCurrPos(0)}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                sx={{ bgcolor: 'green', ':hover': { bgcolor: 'darkgreen' } }}
                fullWidth
                onClick={() => OnContinueClick()}
              >
                {currPos === 1 ? 'Sign Up' : 'Next'}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </SignUpContext.Provider>
  );
}

export default SignUp;
