// components/AuthRedirect.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ACCESS_TOKEN_EXPIRE_MS = 30 * 60 * 1000; // 30 minutes

function AuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const tokenTimestamp = parseInt(localStorage.getItem('token_timestamp') || '0');
    const now = Date.now();

    const isValid = accessToken && now - tokenTimestamp < ACCESS_TOKEN_EXPIRE_MS;

    if (isValid) {
      navigate('/dashboard');
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('token_timestamp');
      navigate('/auth/login');
    }
  }, [navigate]);

  return null; // or a loading spinner
}

export default AuthRedirect;
