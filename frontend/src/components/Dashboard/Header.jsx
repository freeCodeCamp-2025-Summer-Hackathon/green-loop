import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { FaUserCircle, FaCog } from 'react-icons/fa';

const DashHeader = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="10px 20px"
      borderBottom="1px solid #ddd"
    >
      {/* Left: Logo
      <Box marginLeft="5px">
        <img
          src={logo}
            alt="Logo"
            style={{ height: '100px', width:"100px"}}
        />
      </Box> */}

      {/* Center: Title */}
      <Typography variant="h2" color="primary" textAlign="center">
        Ensemble
      </Typography>

      {/* Right: Icons */}
      <Box display="flex" gap="16px" alignItems="center">
        <Tooltip title="Profile" arrow>
          <Box component="span">
            <FaUserCircle size={48} style={{ cursor: 'pointer' }} />
          </Box>
        </Tooltip>
        <Tooltip title="Settings" arrow>
          <Box component="span">
            <FaCog size={48} style={{ cursor: 'pointer' }} />
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default DashHeader;