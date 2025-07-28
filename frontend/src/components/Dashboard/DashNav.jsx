import React, { useState } from "react";
import {
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import { Link } from "react-router-dom";

const drawerWidth = 240;

function DashNav({ onNavigate }) {
  const [selectedKey, setSelectedKey] = useState("dash");

  const menuItems = [
    { key: "dash", label: "Dashboard" },
    { key: "mygroups", label: "My Groups" },
    { key: "threads", label: "My Threads" },
    { key: "resources", label: "My Resource" },
  ];

  const handleSelect = (key) => {
    setSelectedKey(key);
    onNavigate(key);
  };

  return (
    <>
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#e0f7e9",
            borderRight: "1px solid #cceedd",
            paddingTop: "64px",
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              component={Link}
              to="/home"
              size="small"
              sx={{
                color: "inherit",
                borderRadius: 1,
                p: 0.5,
                "&:hover": { backgroundColor: "#d6f5e3" }
              }}
            >
              <HomeIcon fontSize="large" />
            </IconButton>
            <Typography variant="h5" noWrap component="div" fontWeight="bold">
              Ensemble
            </Typography>
          </Box>
        </Toolbar>
        <List>
          {menuItems.map(({ key, label }) => (
            <ListItemButton
              key={key}
              onClick={() => handleSelect(key)}
              selected={selectedKey === key}
              sx={{
                m: 1,
                borderRadius: 2,
                transition: "all 0.3s ease",
                backgroundColor:
                  selectedKey === key ? "#c8ebd8" : "transparent",
                boxShadow:
                  selectedKey === key ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                "&:hover": {
                  backgroundColor: "#d6f5e3",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontWeight: selectedKey === key ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default DashNav;
