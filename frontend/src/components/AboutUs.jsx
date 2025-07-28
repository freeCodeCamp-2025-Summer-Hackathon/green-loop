import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import FormWrapper from "./FormWrapper";

function AboutUs() {

  return (
    <div>
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h2"
            color="primary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <IconButton
              component={Link}
              to="/about"
              size="large"
              color="black"
              sx={{ padding: 0, mr: 1 }}
            >
              <Link to="/home">
                <ArrowBackIcon fontSize="inherit"/>
              </Link>
            </IconButton>
            Ensemble
          </Typography>
        </Box>
      <FormWrapper>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            margin: "0 auto",
          }}
        >
          <div>
            <h1>The Team</h1>
            <h2>Frontend</h2>
            <Typography variant="h5" component="div">
              <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
                <li>Finian Knepper @finianknepper</li>
                <li>Jackson @Wayloe</li>
                <li>Tiffany @Itnerd</li>
                <li>Enmanuel Torres @sn0wier</li>
                <li>Donaven @donaven</li>
                <li>JJ @jjotteson1</li>
              </ul>
            </Typography>

            <h2>Backend</h2>
            <Typography variant="h5" component="div">
              <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
                <li>Abraham @abego2018</li>
                <li>Jamike @bro9872./@johno</li>
                <li>Enmanuel Torres @sn0wier</li>
                <li>Donaven @donaven</li>
              </ul>
            </Typography>
          </div>
        </Box>
      </FormWrapper>
    </div>
  );
}

export default AboutUs;