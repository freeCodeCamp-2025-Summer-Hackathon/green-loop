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
import UserGroups from "../DashRender/UserGroups";

function Dashboard() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [activeComponent, setActiveComponent] = useState("dash");
  useEffect(() => {
    fetch("http://localhost:8000/api/user") // Replace with your FastAPI backend's URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMessage(data.message))
      .catch((error) => setError(error.message));
  }, []);
  const handleNavigateclick = (componentName) => {
    setActiveComponent(componentName);
  };

  console.log(message);
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
              {activeComponent === "dash" && <Dash message={message} />}
              {activeComponent === "groups" && <Groups />}
              {activeComponent === "threads" && <Threads />}
              {activeComponent === "resources" && <Resources />}
              {activeComponent === "mygroups" && <UserGroups />}
            </Box>
          </Toolbar>
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
