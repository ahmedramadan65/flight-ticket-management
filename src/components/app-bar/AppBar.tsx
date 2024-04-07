import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Box } from '@mui/material';

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setUser(undefined);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          Flight Ticket Management System
        </Typography>
        {user?.username ? (
          <Box display={'flex'} gap={2} alignItems={'center'}>
            <Typography variant="subtitle1">{user.username}</Typography>
            <Button color="info" variant="contained" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
