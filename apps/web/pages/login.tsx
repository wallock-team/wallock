import { NextPage } from 'next';
import Image from 'next/image';
import { Box, Button, Container, Divider, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import logoSvg from 'public/branding/logo.svg';
import { useApi } from '../components/contexts/api-context';

const Login: NextPage = function () {
  const api = useApi();
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: '10vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box sx={{ alignSelf: 'center' }}>
            <Image src={logoSvg} alt="Wallock's logo" height={40} />
          </Box>

          <Button
            fullWidth
            variant="contained"
            endIcon={<GoogleIcon />}
            onClick={redirectToGoogleLogin}
          >
            Log in with Google
          </Button>

          <Divider>or</Divider>

          <TextField disabled label="Email" />
          <TextField disabled label="Password" type="password" />
          <Button fullWidth variant="contained" disabled>
            Login (Coming soon)
          </Button>
        </Box>
      </Container>
    </>
  );

  function redirectToGoogleLogin() {
    window.location.href = api.auth.getGoogleLoginUrl();
  }
};

export default Login;
