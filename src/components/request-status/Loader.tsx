import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box
      height={'100%'}
      width={'100%'}
      display={'flex'}
      justifyItems={'center'}
      justifyContent={'center'}
      marginTop={'10%'}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
