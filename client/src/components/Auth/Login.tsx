import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMutation } from '@tanstack/react-query';
import { login } from 'api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'hooks/useAuthContext';
import { authReducerType } from 'types/reducer';
import axios from '../../api/config/axios'
import { SignIn } from 'types/user';
import { notify } from 'utils/notify';

const defaultTheme = createTheme();

export default function Login() {

    const { dispatch } = useAuthContext()

    const navigate = useNavigate();

    const { mutate } = useMutation(login, {
        onSuccess: data => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.access_token}`;
          localStorage.setItem('user', JSON.stringify(data.data))
          dispatch({type: authReducerType.LOGIN, payload: data.data})
          notify(`Welcome ${data.data.username} ✅`, true)
          navigate('/')
        },
        onError: () =>{
          notify('Username or Password is incorrect ❌', true)
        }
    })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const creds: SignIn = {
      username: String(data.get('username')),
      password: String(data.get('password'))
    }
    if (creds.username !== null && creds.password !== null){
        mutate(creds)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent={"center"}>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
