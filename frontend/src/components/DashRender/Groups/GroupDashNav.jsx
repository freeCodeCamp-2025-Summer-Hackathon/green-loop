import React from "react";
import {
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from "@mui/icons-material/Logout"; // optional icon for leave

const drawerWidth = 240;

function GroupDashNav({ onNavigate, onBack, groupName = "Group" }) {
  const menuItems = [
    { key: "threads", label: "Group Threads" },
    { key: "resources", label: "Group Resources" },
    { key: "profile", label: "Group Profile" },
    { key: "leave", label: "Leave Group", isDestructive: true },
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
            backgroundColor: "#e0f7e9",
            borderRight: "1px solid #cceedd",
            paddingTop: "64px",
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "64px",
          }}
        >
          <IconButton onClick={onBack} size="small">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ ml: 1 }}>
            {groupName}
          </Typography>
        </Toolbar>

        <List sx={{ py: 1 }}>
          {menuItems.map(({ key, label, isDestructive }) => (
            <ListItemButton
              key={key}
              onClick={() => onNavigate(key)}
              sx={{
                py: 1.5,
                '& + &': {
                  mt: 0.5,
                },
                color: isDestructive ? "error.main" : "inherit",
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: '1rem',
                  fontWeight: 'medium',
                  color: isDestructive ? "error.main" : "inherit",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default GroupDashNav;
