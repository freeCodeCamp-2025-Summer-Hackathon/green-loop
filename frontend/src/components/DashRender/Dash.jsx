import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  useTheme,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Autocomplete,
  Chip,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

import Groups from "./Groups/Groups";

function Dash({ message }) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  // Dialog open state
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  // Form state
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [groupTags, setGroupTags] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);

  // navigate

  const navigate = useNavigate();

  // Predefined tags for group creation
  const predefinedTags = [
    "Math",
    "Science",
    "English",
    "History",
    "Programming",
    "Art",
    "Music",
    "Physics",
    "Chemistry",
  ];

  const handleClose = () => {
    setOpenCreate(false);
    setOpenJoin(false);
  };

  const handleCreate = async () => {
    // TODO: API call here
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      "http://localhost:8000/api/group/create_group",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: groupName,
          description: groupDesc,
          tags: groupTags.join(","),
          is_private: isPrivate,
        }),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      if (response.status >= 400 && response.status < 500){
        // response is 400, client error
        enqueueSnackbar("Client Error: " + data.detail, { variant: "error" });
      } else if (response.status >= 500){
        enqueueSnackbar("Server Error: Internal Server Error", {variant:'error'});
      }
    } else {
       enqueueSnackbar(data.detail, { variant: "success" });
       setTimeout(() => navigate(`/groups/${data.group_slug}`), 2000);

    }
    handleClose();
  };

  const handleJoin = async () => {
    // TODO: API call here
    const token = localStorage.getItem("access_token");
    const response = await fetch(`http://localhost:8000/api/group/${joinCode}/join`, {
      method: "POST",
      headers : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      }
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status >= 400 && response.status < 500){
        // response is 400, client error
        enqueueSnackbar("Client Error: " + data.detail, { variant: "error" });
      } else if (response.status >= 500){
        enqueueSnackbar("Server Error: Internal Server Error", {variant:'error'});
      }
    } else {
      enqueueSnackbar(data.detail, { variant: "success" });
      setTimeout(() => navigate(`/groups/${joinCode}`), 2000);

    }


    

    handleClose();
  };

  const actions = [
    {
      icon: <AddCircleOutlineIcon />,
      name: "Create Group",
      onClick: () => setOpenCreate(true),
    },
    {
      icon: <GroupAddIcon />,
      name: "Join Group",
      onClick: () => setOpenJoin(true),
    },
  ];

  return (
    <Box sx={{ position: "relative", minHeight: "85vh", px: 3, pt: 3 }}>
      {/* Heading */}
      {/* Groups list */}
      <Groups />

      {/* Floating SpeedDial */}
      <SpeedDial
        ariaLabel="Group Actions"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          "& .MuiFab-primary": {
            width: 70,
            height: 70,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
          },
        }}
        icon={<SpeedDialIcon />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            sx={{ "& .MuiTooltip-tooltip": { fontSize: "1.1rem" } }}
          />
        ))}
      </SpeedDial>

      {/* Create Group Dialog */}
      <Dialog
        open={openCreate}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.grey[900],
            color: theme.palette.common.white,
          },
        }}
      >
        {/* Create a group dialog */}
        <DialogTitle>Create a Study Group</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Group Name"
            margin="normal"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            value={groupDesc}
            onChange={(e) => setGroupDesc(e.target.value)}
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />

          <Autocomplete
            multiple
            options={predefinedTags}
            value={groupTags}
            onChange={(event, newValue) => setGroupTags(newValue)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={option}
                  sx={{ color: "#fff", borderColor: "#4caf50" }}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Select tags"
                margin="normal"
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{
                  ...params.InputProps,
                  style: { color: "#fff" },
                }}
              />
            )}
            sx={{ mt: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                sx={{ color: "#fff" }}
              />
            }
            label="Make Group Private"
            sx={{ color: "#ccc", mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Join Group Dialog */}
      <Dialog
        open={openJoin}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.grey[900],
            color: theme.palette.common.white,
          },
        }}
      >
        <DialogTitle>Join a Study Group</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "400px" }}>
            <TextField
              fullWidth
              label="Group Code"
              margin="normal"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{
                style: { color: "#fff" },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleJoin}>
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Dash;
