import { ThemeContext } from "@emotion/react";
import {
  CssBaseline,
  Drawer,
  useTheme,
  List,
  ListItemButton,
} from "@mui/material";

import { Link } from "react-router-dom";

function DashNav() {
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" anchor="left"></Drawer>

      <List
        sx={{
          marginTop: "60px",
          backgroundColor: "lightgray",
          borderRadius: "5px",
        }}
      >
        <ListItemButton component={Link} to="/dashboard">
          Dashboard
        </ListItemButton>
        <ListItemButton component={Link} to="/groups">
          Groups
        </ListItemButton>
        <ListItemButton component={Link} to="/Threads">
          Threads
        </ListItemButton>
        <ListItemButton component={Link} to="/Resources">
          Resources
        </ListItemButton>
      </List>
    </div>
  );
}

export default DashNav;
