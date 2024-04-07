import axios from 'axios';
import { Flight } from '../../../components/flight/flight.types';

export const getFlights = async (): Promise<Flight[]> => {
  const response = await axios.get('http://localhost:3000/flights');
  return response.data;
};

export const getFlightById = async (id: string): Promise<Flight> => {
  const response = await axios.get(`http://localhost:3000/flights/${id}`);
  return response.data;
};

export const deleteFlightById = async (id: string): Promise<Flight> => {
  const response = await axios.delete(`http://localhost:3000/flights/${id}`);
  return response.data;
};

export const editFlightById = async (flight: Flight): Promise<Flight> => {
  const response = await axios.put(`http://localhost:3000/flights/${flight.id}`, flight);
  return response.data;
};

export const addFlight = async (data: Omit<Flight, 'id'>): Promise<Flight> => {
  const response = await axios.post(`http://localhost:3000/flights`, data);
  return response.data;
};
