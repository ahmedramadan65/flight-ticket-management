import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Flight } from './flight.types';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../modal/ConfirmationModal';
import { Box, Snackbar } from '@mui/material';
import dayjs from 'dayjs';
import { deleteFlightById } from '../../services/apis/flights/flights';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface FlightCardProps {
  flight: Flight;
  disableDelete?: boolean;
}

export default function FlightCard(props: FlightCardProps) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const handleRemoveSnack = () => {
    setMsg('');
  };
  const client = useQueryClient();

  const deleteFlightMutation = useMutation({
    mutationFn: (id: string) => deleteFlightById(id),
    onSuccess() {
      client.invalidateQueries({
        queryKey: ['flights-list'],
      });
    },
  });

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleCardClick = (id: string) => {
    navigate('/' + id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteFlightMutation
      .mutateAsync(props.flight.id)
      .then(() => {
        setMsg('Flight Ticket deleted successfully');
      })
      .catch(() => {
        setMsg('Something went wrong while delete');
      })
      .finally(() => {
        handleClose(e);
      });
  };
  return (
    <Box onClick={() => handleCardClick(props.flight.id)}>
      <Card
        variant="outlined"
        sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Date: {dayjs(props.flight.date).format('YYYY-MM-DD')}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Code: {props.flight.flightCode}
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography color="text.secondary">Capacity: {props.flight.capacity}</Typography>
        </CardContent>
        <CardActions>
          {!props.disableDelete && (
            <React.Fragment>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(msg)}
                onClose={handleRemoveSnack}
                autoHideDuration={3000}
                message={msg}
              />
              <Button size="small" type="button" variant="contained" color="error" onClick={(e) => handleOpen(e)}>
                delete
              </Button>
              <ConfirmationModal
                content="Are you sure ?"
                open={open}
                handleClose={(e) => handleClose(e)}
                handleConfirm={(e) => handleDelete(e)}
              />
            </React.Fragment>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
