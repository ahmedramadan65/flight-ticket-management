// import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import AppBar from './components/app-bar/AppBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FlightDetails from './pages/FlightDetails';
import Home from './pages/Home';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AddTicket from './pages/AddTicket';
import Login from './components/Auth/Login';
import PrivateRoutes from './components/Auth/PrivateRoute';
import { AuthContextProvider } from './context/auth.context';

function App() {
  const client = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <BrowserRouter>
            <AppBar />
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<FlightDetails />} />
                <Route path="/add-ticket" element={<AddTicket />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login register />} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
