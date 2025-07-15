import fonts from "../fonts/fonts";
import React, { useRef, useState } from "react";
import FormWrapper from "./FormWrapper";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton
} from "@mui/material";

import Alert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useNavigate } from "react-router-dom";

import PersonalDetailsForm from "../components/SignUpForm/PersonalDetailsForm";
import CollegeDetailsForm from "../components/SignUpForm/CollegeDetailsForm";
import SignUpContext from "../context/SignUpContext";

function SignUp() {
  const [currPos, setCurrPos] = useState(0);
  const [errors, setErrors] = useState({});
  const [personalFormHasError, setPersonalFormHasError] = useState(true);
  const [collegeDetailsFormError, setCollegeDetailsFormError] = useState(true);
  const [backendResponse, setBackEndResponse] = useState({'detail':''});
  const [showSucessfullAlert, setShowSucessfullAlert] = useState(null);
  const [collegeDetailsFormData, setCollegeDetailsFormData] = useState({
    college: "",
    major: "",
    collegeYear: "freshman",
  });

  const [personalFormData, setPersonalFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

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
    if (currPos === 0) {
      if (personalFormData.email === "") {
        newErrors.email = "Email is required";
      }
      if (personalFormData.username === "") {
        newErrors.username = "Username is required";
      }
      if (personalFormData.password === "") {
        newErrors.password = "Password is required";
      }
      if (personalFormData.password !== personalFormData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      setErrors(newErrors);
      return newErrors;
    } else {
      if (collegeDetailsFormData.college === "") {
        newErrors.college = "College is required";
      }
      if (collegeDetailsFormData.major === "") {
        newErrors.major = "Major is required";
      }
      if (collegeDetailsFormData.collegeYear === "") {
        newErrors.collegeYear = "College year is required";
      }
      setErrors(newErrors);
      return newErrors;
    }
  };

  const OnContinueClick = () => {
    if (currPos === 0) {
      const validationErrors = validateForm();
      const hasErrors = Object.keys(validationErrors).length > 0;

      if (!hasErrors) {
        setPersonalFormHasError(false);
        setCurrPos(currPos + 1);
      } else {
        setPersonalFormHasError(true);
      }
    }
  };

  const handleSubmitForm = async (e) => {

    // Perform Form Validation
    if (currPos === 1){
      const validationErrors = validateForm();
      const hasErrors = Object.keys(validationErrors).length > 0;
      if(!hasErrors) {
        setCollegeDetailsFormError(false)
      } else {
        setCollegeDetailsFormError(true)
        return;
      }

    }

    const collegeYearMapping = {
        notApplicable:null,
        freshman: 1,
        sophomore: 2,
        junior: 3,
        senior: 4
      };
    const body = {
      username : personalFormData.username,
      email : personalFormData.email,
      college_name: collegeDetailsFormData.college, 
      major: collegeDetailsFormData.major,
      college_year:collegeYearMapping[collegeDetailsFormData.collegeYear.toLowerCase()],
      password:personalFormData.confirmPassword
    };
    const response = await fetch('http://localhost:8000/api/create_new_user', {
      method:'POST',
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
        
      }, 
      body:JSON.stringify(body)
    });
    if (!response.ok){
      if(response.status >= 400 && response.status < 500){
        const data = await response.json()
        // if its just 400 error(client erros), not 500 erros
        console.error('Client Error', data.detail|| 'Invalid Request')
        setBackEndResponse({detail:data.detail});
        setShowSucessfullAlert(false);
        
      } else if (response.status >= 500 ){
        // server error
        const data = await response.json()
        console.error('Server Error');
        setBackEndResponse({detail:`Server Error | ${data.detail}`});
        setShowSucessfullAlert(false);

      }

    } else {
        const data = await response.json();
        console.log('User Created', data);
        setBackEndResponse({detail:data.detail})
        setShowSucessfullAlert(true);
        setTimeout(() => {
          navigate('/auth/login');
          }, 2000); // 2000ms = 2 seconds
      }

    
  }

  const displayBackButton = () => {
    return (
      <IconButton
        aria-label="back"
        size="medium"
        onClick={() => {
          setCurrPos(currPos - 1);
        }}
      >
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>
    );
  };

  const handleShowAlert = () => {
    if (showSucessfullAlert === true){
      return (
        <div style={{ width: '20%', margin: '1.25rem auto' }}>
        <Alert variant="filled" severity="success">
            {backendResponse.detail}
        </Alert>
      </div>
      )
    } else if (showSucessfullAlert === false){
      return (
        <div style={{ width: '20%', margin: '1.25rem auto' }}>
        <Alert variant="filled" severity="error">
            {backendResponse.detail}
        </Alert>
      </div>
      )
    } else if (showSucessfullAlert === null){
      return;
    }
  }

  




  return (
    <SignUpContext.Provider
      value={{
        errors,
        personalFormData,
        handleFormChange,
        setCurrPos,
        collegeDetailsFormData,
      }}
    >
      {
        handleShowAlert()
      }
      <FormWrapper>
         {/* Back Button */}
            {currPos === 1 && displayBackButton()}

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
              Create your Account
            </Typography>

            <Box mb={3}>{handleFormDisplay()}</Box>

            <Button
              variant="contained"
              sx={{ bgcolor: "green", ":hover": { bgcolor: "darkgreen" } }}
              onClick={function(){
                if (currPos === 1){
                  handleSubmitForm();
                } else {
                  OnContinueClick();
                }
              }}
              fullWidth
            >
              {currPos === 1 ? "Sign Up" : "Next"}
            </Button>

            <Typography textAlign="center" mt={2} sx={{ fontSize: 14 }}>
              Already have an account?{" "}
              <Button
                variant="text"
                size="small"
                sx={{ textTransform: "none", color: "primary.main", fontWeight: 500 }}
                onClick={() => {
                navigate('/auth/login')
                }}
              >
              Click here to log in
              </Button>
            </Typography>
      </FormWrapper>
    </SignUpContext.Provider>
  );
}

export default SignUp;
