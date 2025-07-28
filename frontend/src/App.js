import logo from "./logo.svg";
import "./App.css";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, Dashboard, LandingPage, AboutUs, ContactUs } from "./components";
import GroupDetailsPage from "./components/DashRender/Groups/GroupDetailsPage.jsx";
import GroupProfile from "./components/DashRender/Groups/GroupProfile.jsx";
import { SnackbarProvider } from "notistack";

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
        <SnackbarProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/login" element={<SignIn />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/home" element={<LandingPage/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutUs/>}/>
            <Route path="/contact" element={<ContactUs/>}/>

            <Route path="/groups/:group_slug" element={<GroupDetailsPage />} />
            <Route path="/groups/:slug" element={<GroupProfile />} />
          </Routes>
        </SnackbarProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
