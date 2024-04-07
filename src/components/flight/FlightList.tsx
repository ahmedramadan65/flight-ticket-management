import FlightCard from './FlightCard';
import { Box } from '@mui/material';
import Loader from '../request-status/Loader';
import ErrorStatus from '../request-status/ErrorStatus';
import { useQuery } from '@tanstack/react-query';
import { getFlights } from '../../services/apis/flights/flights';

const FlightList = () => {
  const {
    data: flights,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`flights-list`],
    queryFn: () => getFlights(),
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorStatus />;
  }

  return (
    <>
      {flights?.length && flights?.length > 0
        ? flights.map((flight) => (
            <Box key={flight.id} marginBottom={2}>
              <FlightCard flight={flight} />
            </Box>
          ))
        : null}
    </>
  );
};

export default FlightList;
