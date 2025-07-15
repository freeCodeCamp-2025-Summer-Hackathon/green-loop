import React, {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {useNavigate} from "react-router-dom";

import PersonalDetailsForm from "../components/SignUpForm/PersonalDetailsForm";
import CollegeDetailsForm from "../components/SignUpForm/CollegeDetailsForm";
import SignUpContext from "../context/SignUpContext";

function SignUp() {
    const [currPos, setCurrPos] = useState(0);
    const [errors, setErrors] = useState({});

    // Snow: Use this as a router, not directly window links
    const navigate = useNavigate();

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
        const {name, value} = e.target;

        const setter = currPos === 0 ? setPersonalFormData : setCollegeDetailsFormData;
        setter((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Snow: There's no need to use multiple if blocks that do the same, a single ternary does the same job, with less memory.
        // I'll leave the previous code here if you want to review.
        // if (currPos === 0) {
        //   setPersonalFormData((prev) => ({
        //     ...prev,
        //     [name]: value,
        //   }));
        // } else if (currPos === 1) {
        //   setCollegeDetailsFormData((prev) => ({
        //     ...prev,
        //     [name]: value,
        //   }));
        // }
    };

    const handleFormDisplay = () => {
        if (currPos === 0) {
            return <PersonalDetailsForm/>;
        } else if (currPos === 1) {
            return <CollegeDetailsForm/>;
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (currPos === 0) {
            if (!personalFormData.email) newErrors.email = "Email is required";
            if (!personalFormData.username) newErrors.username = "Username is required";
            if (!personalFormData.password) newErrors.password = "Password is required";
            if (personalFormData.password !== personalFormData.confirmPassword)
                newErrors.confirmPassword = "Passwords do not match";
        } else {
            if (!collegeDetailsFormData.college) newErrors.college = "College is required";
            if (!collegeDetailsFormData.major) newErrors.major = "Major is required";
            if (!collegeDetailsFormData.collegeYear) newErrors.collegeYear = "College year is required";
        }
        setErrors(newErrors);
        return newErrors;

        /*
        Snow: Same thing as above, if statements don't require multiple to be keyed if there's only one case, I'd never recommend this in any other case, but for error handlings since we're supposed to only have one error for required types then this is fine,
        Another thing is that checking for empty strings will not work, as whitespaces won't trigger the error warning, inputs have their own logic to know if a field is correct, but here I'm using simple booleans to match these errors, everything else was fine,
        But notice how less boilerplate you write this way, it is important to know stuff like this.
         */

        // }
        // if (currPos === 0) {
        //   if (personalFormData.email === "") {
        //     newErrors.email = "Email is required";
        //   }
        //   if (personalFormData.username === "") {
        //     newErrors.username = "Username is required";
        //   }
        //   if (personalFormData.password === "") {
        //     newErrors.password = "Password is required";
        //   }
        //   if (personalFormData.password !== personalFormData.confirmPassword)
        //     newErrors.confirmPassword = "Passwords do not match";
        //   setErrors(newErrors);
        //   return newErrors;
        // } else {
        //   if (collegeDetailsFormData.college === "") {
        //     newErrors.college = "College is required";
        //   }
        //   if (collegeDetailsFormData.major === "") {
        //     newErrors.major = "Major is required";
        //   }
        //   if (collegeDetailsFormData.collegeYear === "") {
        //     newErrors.collegeYear = "College year is required";
        //   }
        //   setErrors(newErrors);
        //   return newErrors;
        // }
    };

    /* Snow:
    Changed this function so it also handles redirections, also remember camel casing in javascript
    another thing to note here is that there is no need to validate errors with extra states, errors are already handled
    in validateForm(), there is no need to provide extra validation, that is the reason why the function exists.
     */
    const handleNextClick = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            if (currPos === 0) {
                setCurrPos(currPos + 1);
            } else if (currPos === 1) {
                console.log("Submitting form...", {personalFormData, collegeDetailsFormData});
                alert("Sign up successful!"); // <-- We should remove this
                navigate("/auth/login");
            }
        }
    };

    const displayBackButton = () => {
        return (
            <IconButton
                aria-label="back"
                size="medium"
                onClick={() => {
                    setCurrPos(currPos - 1);
                }}
            >
                <ArrowBackIcon fontSize="inherit"/>
            </IconButton>
        );
    };

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
            <Box sx={{maxWidth: 500, margin: "40px auto"}}>
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: 4,
                        backgroundColor: "#f9f9f9",
                        boxShadow: 3,
                    }}
                >
                    <CardContent>
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
                            sx={{fontSize: 20, color: "black", mb: 3}}
                        >
                            Create your Account
                        </Typography>

                        <Box mb={3}>{handleFormDisplay()}</Box>

                        <Button
                            variant="contained"
                            sx={{bgcolor: "green", ":hover": {bgcolor: "darkgreen"}}}
                            onClick={handleNextClick} // <-- When a single function is being called there's no need to lambda, react handles this.
                            fullWidth
                        >
                            {currPos === 1 ? "Sign Up" : "Next"}
                        </Button>

                        <Typography textAlign="center" mt={2} sx={{fontSize: 14}}>
                            Already have an account?{" "}
                            <Button
                                variant="text"
                                size="small"
                                sx={{textTransform: "none", color: "primary.main", fontWeight: 500}}
                                onClick={() => navigate("/auth/login")}
                            >
                                Click here to log in
                            </Button>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </SignUpContext.Provider>
    );
}

export default SignUp;
