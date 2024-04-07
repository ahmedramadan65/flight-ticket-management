import { Flight } from './flight.types';
import { date, number, object, string } from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormLabel, Snackbar, TextField, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addFlight, editFlightById } from '../../services/apis/flights/flights';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FlightFormProps {
  flight?: Flight;
}

type FlightFormFields = Omit<Flight, 'id'>;

dayjs.extend(customParseFormat);

const FlightForm = (props: FlightFormProps) => {
  const schema = object({
    flightCode: string().required('Flight code is required').max(8).min(1),
    date: date().min(new Date(), 'Date must be after today').required('Date is required'),
    capacity: number().typeError('Capacity should be number').required('capacity is required').max(500).min(1),
  });

  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setMsg('');
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FlightFormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      date: props.flight?.date ? dayjs(props.flight.date).toDate() : undefined,
      capacity: props.flight?.capacity || undefined,
      flightCode: props.flight?.flightCode || '',
    },
  });

  const addFlightMutation = useMutation({
    mutationFn: (data: FlightFormFields) => addFlight(data),
  });
  const editFlightMutation = useMutation({
    mutationFn: (data: Flight) => editFlightById(data),
  });
  const client = useQueryClient();

  const onSubmit: SubmitHandler<FlightFormFields> = async (data) => {
    setLoading(true);
    try {
      //edit
      if (props.flight) {
        await editFlightMutation
          .mutateAsync(
            { id: props.flight.id, ...data },
            {
              onSuccess() {
                client.invalidateQueries({
                  queryKey: ['flights-list'],
                });
              },
            },
          )
          .then(() => {
            setMsg('Flight Ticket edited successfully');
          });
      } else {
        //add
        await addFlightMutation
          .mutateAsync(data, {
            onSuccess() {
              client.invalidateQueries({
                queryKey: ['flights-list'],
              });
            },
          })
          .then(() => {
            setMsg('Flight Ticket added successfully');
            navigate('/');
          });
      }
    } catch (error) {
      setMsg(props.flight ? 'Something went wrong while edit' : 'Something went wrong while add');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(msg)}
        onClose={handleClose}
        autoHideDuration={3000}
        message={msg}
      />
      <Box display={'flex'} flexDirection={'column'} gap={2} marginTop={2}>
        <Box mt={2} display={'flex'} flexDirection={'column'}>
          <FormLabel sx={{ marginBottom: 1 }}>Flight code</FormLabel>
          <TextField placeholder="Flight code" variant="outlined" {...register('flightCode')} />
          {errors.flightCode && (
            <Typography component={'p'} color={'red'}>
              {errors.flightCode.message}
            </Typography>
          )}
        </Box>

        <Box mt={2} display={'flex'} flexDirection={'column'}>
          <FormLabel>Flight Date</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <Controller
                control={control}
                name="date"
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <DatePicker
                      label=""
                      disablePast
                      value={field.value ? dayjs(field.value) : undefined}
                      inputRef={field.ref}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                    />
                  );
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors.date && (
            <Typography component={'p'} color={'red'}>
              {errors.date.message}
            </Typography>
          )}
        </Box>

        <Box mt={2} display={'flex'} flexDirection={'column'}>
          <FormLabel sx={{ marginBottom: 1 }}>Flight Capacity</FormLabel>
          <TextField placeholder="Flight Capacity" variant="outlined" {...register('capacity')} />
          {errors.capacity && (
            <Typography component={'p'} color={'red'}>
              {errors.capacity.message}
            </Typography>
          )}
        </Box>

        <Button type="submit" variant="contained" disabled={loading}>
          {props.flight ? 'Edit Flight Ticket' : 'Add Flight Ticket'}
        </Button>
      </Box>
    </form>
  );
};
export default FlightForm;
