import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorStatus = () => {
  const navigate = useNavigate();
  return (
    <Box
      height={'100%'}
      width={'100%'}
      display={'flex'}
      justifyItems={'center'}
      justifyContent={'center'}
      alignItems={'center'}
      marginTop={'10%'}
      flexDirection={'column'}
    >
      <Typography component={'p'} gutterBottom>
        Something went wrong .. please try again later
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </Button>
    </Box>
  );
};

export default ErrorStatus;
