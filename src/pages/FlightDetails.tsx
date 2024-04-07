import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getFlightById } from '../services/apis/flights/flights';
import Loader from '../components/request-status/Loader';
import ErrorStatus from '../components/request-status/ErrorStatus';
import { Container } from '@mui/material';
import FlightCard from '../components/flight/FlightCard';
import React from 'react';
import FlightForm from '../components/flight/FlightForm';
// import { getById } from '../store/flight.slice';

const FlightDetails = () => {
  const { id } = useParams();
  const {
    data: flight,
    isLoading,
    error,
  } = useQuery({
    queryKey: [`flight`, id],
    queryFn: () => getFlightById(id!),
    enabled: Boolean(id),
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorStatus />;

  return (
    <Container sx={{ marginTop: 2 }}>
      {flight && (
        <React.Fragment>
          <FlightCard flight={flight} disableDelete />
          <FlightForm flight={flight} />
        </React.Fragment>
      )}
    </Container>
  );
};

export default FlightDetails;
