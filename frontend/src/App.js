import logo from "./logo.svg";
import "./App.css";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import AuthRedirect from "./components/AuthRedirect.jsx";
import { SignIn, SignUp, Dashboard } from "./components";

const theme = createTheme({
  palette: {
    primary: {
      main: green[600], // or use a hex like '#4caf50'
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Optional: resets default browser styles */}
      <div>
        <Routes>
          <Route path="/" element={<AuthRedirect />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
