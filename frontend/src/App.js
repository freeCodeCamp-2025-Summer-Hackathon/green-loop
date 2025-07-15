import logo from './logo.svg';
import './App.css';
import SignUp from './components/SignUp.jsx';
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn.jsx';



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
            <Route path="/" element={<SignUp />} />
            <Route path="/auth/login" element={<SignIn />} />
        </Routes>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
