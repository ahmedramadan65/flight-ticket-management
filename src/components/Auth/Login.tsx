import { object, string } from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Container, FormLabel, Snackbar, TextField, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { login, signup } from '../../services/apis/users/users';
import * as CryptoJS from 'crypto-js';

interface LoginFormInputs {
  username: string;
  password: string;
}

interface LoginFormProps {
  register?: boolean;
}

const encrypt = (text: string) => {
  const utf8Plaintext = CryptoJS.enc.Utf8.parse(text);
  const utf8Key = CryptoJS.enc.Utf8.parse('secret-key');

  return CryptoJS.AES.encrypt(utf8Plaintext, utf8Key, { mode: CryptoJS.mode.ECB }).toString();
};

const Login = (props: LoginFormProps) => {
  const schema = object({
    username: string().required('username is required').max(50).min(4),
    password: string().required('password is required').max(50).min(4),
  });

  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleClose = () => {
    setMsg('');
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const encryptedPassword = encrypt(data.password);
    try {
      setLoading(true);
      if (props.register) {
        signup(data.username, encryptedPassword)
          .then((res) => {
            setUser({
              username: data.username,
            });
            localStorage.setItem('accessToken', res.accessToken);
            navigate('/');
          })
          .catch(() => {
            setMsg('Something went wrong .. try again later');
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        login(data.username, encryptedPassword)
          .then((res) => {
            setUser({
              username: data.username,
            });
            localStorage.setItem('accessToken', res.accessToken);
            navigate('/');
          })
          .catch(() => {
            setMsg(`Username or password doesn't match`);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (error) {
      console.log('eeeee');
    }
  };

  return (
    <Container maxWidth={'sm'} sx={{ marginTop: 2 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(msg)}
        onClose={handleClose}
        autoHideDuration={3000}
        message={msg}
      />
      <Typography component={'h2'} variant="h6" textAlign={'center'}>
        {props.register ? 'Register' : 'Login'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display={'flex'} flexDirection={'column'} gap={2} marginTop={2}>
          <Box mt={2} display={'flex'} flexDirection={'column'}>
            <FormLabel sx={{ marginBottom: 1 }}>Username</FormLabel>
            <TextField placeholder="Username" variant="outlined" {...register('username')} />
            {errors.username && (
              <Typography component={'p'} color={'red'}>
                {errors.username.message}
              </Typography>
            )}
          </Box>
          <Box mt={2} display={'flex'} flexDirection={'column'}>
            <FormLabel sx={{ marginBottom: 1 }}>Password</FormLabel>
            <TextField placeholder="Password" variant="outlined" type="password" {...register('password')} />
            {errors.password && (
              <Typography component={'p'} color={'red'}>
                {errors.password.message}
              </Typography>
            )}
          </Box>
        </Box>
        <Box mt={2} display={'flex'} width={'100%'}>
          <Button type="submit" disabled={loading} sx={{ flexGrow: 1 }} variant="contained">
            {props.register ? 'Register' : 'Login'}
          </Button>
        </Box>
        {!props.register && (
          <Button
            type="button"
            sx={{ width: '100%', textAlign: 'center', marginTop: 2 }}
            variant="text"
            disabled={loading}
            onClick={() => navigate('/register')}
          >
            don't have account .. register
          </Button>
        )}
      </form>
    </Container>
  );
};

export default Login;
