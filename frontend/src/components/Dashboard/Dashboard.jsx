import React, { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Toolbar,
} from "@mui/material";
import DashNav from "./DashNav";
import Groups from "../DashRender/Groups";
import Threads from "../DashRender/Threads";
import Resources from "../DashRender/Resources";
import Dash from "../DashRender/Dash";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("dash");

  const handleNavigateclick = (componentName) => {
    setActiveComponent(componentName);
  };
  return (
    <Container>
      <Box>
        <Typography variant="h2" color="primary" textAlign={"center"}>
          Ensemble
        </Typography>
        <Box>
          <Toolbar>
            <DashNav onNavigate={handleNavigateclick} />
            <Box sx={{ width: "20px" }} />
            <Box
              sx={{
                display: "flexbox",
                marginTop: "60px",
                backgroundColor: "lightgrey",
                width: "80%",
                height: "50vh",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              {activeComponent === "dash" && <Dash />}
              {activeComponent === "groups" && <Groups />}
              {activeComponent === "threads" && <Threads />}
              {activeComponent === "resources" && <Resources />}
            </Box>
          </Toolbar>
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
