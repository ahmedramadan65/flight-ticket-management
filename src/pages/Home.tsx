import { Box, Button, Container } from '@mui/material';
import FlightList from '../components/flight/FlightList';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ marginTop: 2 }}>
      <Box sx={{ marginBottom: 2, width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => navigate('/add-ticket')}>
          Add Ticket
        </Button>
      </Box>
      <FlightList />
    </Container>
  );
};

export default Home;
