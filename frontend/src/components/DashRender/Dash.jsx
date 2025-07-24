import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
} from "@mui/material";

function Dash({ message }) {
  const theme = useTheme();

  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const handleClose = () => {
    setOpenCreate(false);
    setOpenJoin(false);
  };

  const handleCreate = () => {
    console.log("Create group:", groupName, groupDesc);
    // TODO: API call here
    handleClose();
  };

  const handleJoin = () => {
    console.log("Join group with code:", joinCode);
    // TODO: API call here
    handleClose();
  };

  return (
    <Box display="flex" justifyContent="center" mt={8} px={2}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 5,
          borderRadius: 5,
          boxShadow: 6,
          textAlign: "center",
        }}
      >
       
        <Typography variant="h6" color="text.secondary">
        Join or create a study group to collaborate and learn with peers.
        </Typography>


        <Box mt={5} display="flex" justifyContent="center" gap={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setOpenCreate(true)}
          >
            Create Group
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => setOpenJoin(true)}
          >
            Join Group
          </Button>
        </Box>
      </Card>

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
