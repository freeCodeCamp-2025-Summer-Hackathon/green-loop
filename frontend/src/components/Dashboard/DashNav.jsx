import { ThemeContext } from "@emotion/react";
import {
  CssBaseline,
  Drawer,
  useTheme,
  List,
  ListItemButton,
} from "@mui/material";

import { Link } from "react-router-dom";

function DashNav({ onNavigate }) {
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" anchor="left"></Drawer>

      <List
        sx={{
          marginTop: "60px",
          backgroundColor: "lightgray",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
          height: "50vh",
        }}
      >
        <ListItemButton onClick={() => onNavigate("dash")}>
          Dashboard
        </ListItemButton>
        <ListItemButton onClick={() => onNavigate("groups")}>
          Groups
        </ListItemButton>
        <ListItemButton onClick={() => onNavigate("threads")}>
          Threads
        </ListItemButton>
        <ListItemButton onClick={() => onNavigate("resources")}>
          Resources
        </ListItemButton>
      </List>
    </div>
  );
}

export default DashNav;
