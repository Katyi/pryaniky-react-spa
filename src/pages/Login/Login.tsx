import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState<Auth>({
    username: '',
    password: '',
  });
  const [indForMessage, setIndForMessage] = useState<number>(0);
  localStorage.getItem('token');

  const signUpUser = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_API_URL}/ru/data/v3/testmethods/docs/login`,
        {
          username: userAuth.username,
          password: userAuth.password,
        }
      );
      localStorage.setItem('token', res.data.data.token);
      navigate('/');
    } catch (err) {
      console.error('Error with auth:', err);
      setIndForMessage(1);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 5,
        mb: 5,
      }}
    >
      {indForMessage === 1 ? (
        <Typography
          variant="h5"
          sx={{
            color: 'red',
            mb: 3,
            width: { xs: '60vw' },
            textAlign: 'center',
          }}
        >
          Что-то пошло не так...
        </Typography>
      ) : (
        <Typography
          variant="h5"
          sx={{
            color: 'primary.dark',
            mb: 3,
            width: { xs: '60vw' },
            textAlign: 'center',
          }}
        >
          Введите логин и пароль
        </Typography>
      )}

      <form autoComplete="off" className="loginForm">
        <TextField
          type="username"
          variant="outlined"
          sx={{
            mt: '30px',
            bgcolor: '#fff',
            borderRadius: '5px',
            width: '100%',
          }}
          placeholder="Имя"
          fullWidth
          value={userAuth.username}
          onChange={(e) =>
            setUserAuth({ ...userAuth, username: e.currentTarget.value })
          }
        />
        <TextField
          type="password"
          variant="outlined"
          sx={{
            mt: '30px',
            bgcolor: '#fff',
            borderRadius: '5px',
            width: '100%',
          }}
          placeholder="Пароль"
          fullWidth
          value={userAuth.password}
          onChange={(e) =>
            setUserAuth({ ...userAuth, password: e.currentTarget.value })
          }
        />

        <Button
          variant="outlined"
          sx={{
            mt: 5,
            bgcolor: '#fff',
            height: '35px',
            borderRadius: '5px',
            fontWeight: '700',
          }}
          onClick={(e) => signUpUser(e)}
        >
          Войти
        </Button>
      </form>
    </Box>
  );
};

export default Login;
