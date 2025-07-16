import { CssBaseline, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";
import { Box } from "@mui/material";
import Resources from "../Groups/Resources";
import Groups from "../Groups/Groups";
import Threads from "../Groups/Threads";
import Dash from "../Groups/Dash";

function DashRender(activeComponent) {
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" anchor="right"></Drawer>
      <Box sx={{ marginTop: "60px", backgroundColor: "lightgrey" }}>
        {activeComponent === "dash" && <Dash />}
        {activeComponent === "groups" && <Groups />}
        {activeComponent === "threads" && <Threads />}
        {activeComponent === "resources" && <Resources />}
      </Box>
    </div>
  );
}

export default DashRender;
