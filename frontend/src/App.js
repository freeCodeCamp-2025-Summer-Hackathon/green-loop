import logo from "./logo.svg";
import "./App.css";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import { Dashboard, Header, Footer, AboutUs, ContactUs, SignIn, SignUp } from "./components";

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
        {/* <Routes>
           <Route path="/" element={<SignUp />} /> -->
            <Route path="/auth/login" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes> */}
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>
          <Route path="/ContactUs" element={<ContactUs />}></Route>
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
