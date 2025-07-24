import React, { useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  Typography,
  CssBaseline,
  Paper,
  Divider,
} from "@mui/material";
import DashNav from "./DashNav";
import Groups from "../DashRender/Groups";
import Threads from "../DashRender/Threads";
import Resources from "../DashRender/Resources";
import Dash from "../DashRender/Dash";
import UserGroups from "../DashRender/UserGroups";
import { useNavigate } from "react-router-dom";
import { validateToken, isTokenExpired, fetchUserDetails } from "../../utils/utils";

const drawerWidth = 240;

function Dashboard() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [activeComponent, setActiveComponent] = useState("dash");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!validateToken() || isTokenExpired()) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("token_timestamp");
          localStorage.removeItem("refresh_token");
          navigate("/auth/login");
          return;
        }

        const data = await fetchUserDetails();
        setMessage(`Hello ${data.username}`);
      } catch (err) {
        setError(err.message);
        console.error("Error loading user:", err);
        navigate("/auth/login");
      }
    };

    loadUser();
  }, [navigate]);

  const handleNavigateClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "dash":
        return <Dash message={message} />;
      case "groups":
        return <Groups />;
      case "threads":
        return <Threads />;
      case "resources":
        return <Resources />;
      case "mygroups":
        return <UserGroups />;
      default:
        return <Dash message={message} />;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#e3f2fd" }}>
      <CssBaseline />
      <DashNav onNavigate={handleNavigateClick} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: `calc(100% - ${drawerWidth}px)`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Box sx={{ px: 4, py: 3 }}>
          <Typography variant="h4" color="primary" fontWeight={600} gutterBottom>
            Welcome to Ensemble
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {message}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#f1f9f6",
              borderRadius: 3,
              p: 4,
              minHeight: "65vh",
              boxShadow: "0px 3px 12px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease-in-out",
            }}
          >
            {renderActiveComponent()}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
