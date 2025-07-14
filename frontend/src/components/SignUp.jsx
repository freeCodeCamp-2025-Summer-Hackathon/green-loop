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
  const [collegeDetailsFormData, setCollegeDetailsFormData] = useState({
    college: "",
    major: "",
    collegeYear: "Freshman",
  });

  const [personalFormData, setPersonalFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (currPos === 0) {
      setPersonalFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (currPos === 1) {
      setCollegeDetailsFormData((prev) => ({
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




  const validateForm = () => {
        const newErrors = {};
        if (currPos === 0){
            if (personalFormData.email === ""){
            newErrors.email = "Email is required";
          }
          if (personalFormData.username === ""){
            newErrors.username = "Username is required";
          }
          if (personalFormData.password === ""){
            newErrors.password = "Password is required";
          }
          if (personalFormData.password !== personalFormData.confirmPassword)
              newErrors.confirmPassword = "Passwords do not match";
          setErrors(newErrors);
          return newErrors
        } else {
          if (collegeDetailsFormData.college === ""){
          newErrors.college = "College is required";
        }
        if (collegeDetailsFormData.major === ""){
          newErrors.major = "Major is required";
        }
        if (collegeDetailsFormData.collegeYear === ""){
          newErrors.collegeYear = "College year is required";
        }
        setErrors(newErrors);
        return newErrors
        }
    };

    const OnContinueClick = () => {
    if (currPos === 0){
      const validationErrors = validateForm();
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
        handleFormChange,
        setCurrPos,
        collegeDetailsFormData
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

           
              <Button
                variant="contained"
                sx={{ bgcolor: 'green', ':hover': { bgcolor: 'darkgreen' } }}
                onClick={() => OnContinueClick()}
                fullWidth
              >
                {currPos === 1 ? 'Sign Up' : 'Next'}
              </Button>
          </CardContent>
        </Card>
      </Box>
    </SignUpContext.Provider>
  );
}

export default SignUp;
