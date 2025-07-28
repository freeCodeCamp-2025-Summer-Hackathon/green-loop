import React from "react";
import Footer from "./Dashboard/Footer";
import logo from "../Logo.png";
import { 
  Box,
  Typography,
  Button,
 } from "@mui/material";

 import { Link } from 'react-router-dom';

function LandingPage() {
  const features = [
    {
      title: "Easy Collaboration",
      description: "Work together seamlessly with others!",
    },
    {
      title: "Group Synchronization",
      description: "Get in touch with people who are from your university and in the same field of study!",
    },
    {
      title: "Simple Group Creation",
      description: "You can easily create a group with the touch of a button and others can see your group or you can even make it private!"
    },
  ];

  return (
    <div>
      <Box>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#e0f7e9",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1200,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 40,
                width: "auto",
              }}
            />
            <Typography variant="h5" component="h1">
              Ensemble
            </Typography>
          </Box>

          <Box>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <Button
                variant="text"
                color="primary"
                sx={{ mr: 2, fontSize: "20px" }}
              >
                Dashboard
              </Button>
            </Link>
          </Box>
        </Box>
        <Box sx={{ paddingTop: "100px", px: 2 }}>
          <Typography variant="h3" gutterBottom textAlign="center">
            Welcome to Ensemble
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h4"
            color="text.secondary"
            textAlign="center"
            maxWidth={900}
            mx="auto"
            mb={10}
          >
            Discover the power of Ensemble to manage your groups effortlessly
            and collaborate seamlessly.
          </Typography>

          {/* Features Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: 4,
              maxWidth: 1200,
              mx: "auto",
              mt: 6,
              mb: 10,
            }}
          >
            {features.map(({ title, description }) => (
              <Box
                key={title}
                sx={{
                  textAlign: "center",
                  px: 2,
                }}
              >
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* CTA Button */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/dashboard"
            >
              Get Started Now
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
}

export default LandingPage;