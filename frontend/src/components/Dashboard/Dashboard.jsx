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
} from "@mui/material";
import DashNav from "./DashNav";
import Groups from "../Groups/Groups";
import Threads from "../Groups/Threads";
import Resources from "../Groups/Resources";
import DashRender from "./DashRender";
import Dash from "../Groups/Dash";

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
          <DashNav onNavigate={handleNavigateclick} />
          <DashRender props={activeComponent} />
          {activeComponent === "dash" && <Dash />}
          {activeComponent === "groups" && <Groups />}
          {activeComponent === "threads" && <Threads />}
          {activeComponent === "resources" && <Resources />}
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
