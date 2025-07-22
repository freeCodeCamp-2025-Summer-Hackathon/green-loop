import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Toolbar,
} from "@mui/material";

function Dash(message) {
  return (
    <Box sx={{}}>
      <Typography variant="h6">
        Here is your message, {message.message}!
      </Typography>
    </Box>
  );
}

export default Dash;
