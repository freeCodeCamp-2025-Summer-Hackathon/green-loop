 HEAD
import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp.jsx';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn.jsx';
import Dashboard from './components/Dashboard.jsx';
import AuthRedirect from './components/AuthRedirect.jsx';



import logo from "./logo.svg";
import "./App.css";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import { Dashboard, SignIn, SignUp } from "./components";


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
            <Route path='/auth/signup' element={<SignUp/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>

        
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>

        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
