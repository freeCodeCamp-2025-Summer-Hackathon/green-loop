import React from "react";
import {
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

function DashNav({ onNavigate }) {
  const menuItems = [
    { key: "dash", label: "Dashboard" },
    { key: "mygroups", label: "My Groups" },
    { key: "groups", label: "Groups" },
    { key: "threads", label: "My Threads" },
    { key: "resources", label: "My Resource" },
  ];

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
            backgroundColor: "#e0f7e9", // pastel green (not gray!)
            borderRight: "1px solid #cceedd",
            paddingTop: "64px",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Ensemble
          </Typography>
        </Toolbar>
        <List>
          {menuItems.map(({ key, label }) => (
            <ListItemButton key={key} onClick={() => onNavigate(key)}>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default DashNav;
