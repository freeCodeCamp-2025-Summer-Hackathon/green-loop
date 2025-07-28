import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import GroupDashNav from "./GroupDashNav";
import { Box, Typography } from "@mui/material";
import GroupThreads from "../Threads/GroupThreads";
import GroupProfile from "./GroupProfile";
import { useAuthGuard } from "../../../hooks/useAuthGuard";

function GroupDetails() {
  useAuthGuard();
  const { group_slug } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("threads");

  const handleNavigate = (tabKey) => {
    setActiveTab(tabKey);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <GroupDashNav
        onNavigate={handleNavigate}
        onBack={handleBack}
        groupName={state?.name}
      />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {activeTab === "threads" && "Group Threads"}
          {activeTab === "resources" && "Group Resources"}
          {activeTab === "profile" && "Group Profile"}
          {activeTab === "Leave" && "Group Profile"}
        </Typography>

        {/* Dynamic content here */}
        <Box>
          {activeTab === "threads" && <GroupThreads group_slug={group_slug} />}
          {activeTab === "resources" && (
            <Typography>Group's shared resources go here...</Typography>
          )}
          {activeTab === "profile" && <GroupProfile group_slug={group_slug} />}
          {activeTab === "leave" && <Typography>Leave </Typography>}
        </Box>
      </Box>
    </Box>
  );
}

export default GroupDetails;
