import React from 'react';
import Header from '../components/header';
import '../styles/login.css';
import { Container, Typography, TextField, Button, Divider, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
    return (
        <div className="login-page">
            <Header />
            <Container className="login-container">
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Welcome
                </Typography>

                <Box component="form" className="myForm">
                    <TextField label="Name" variant="outlined" fullWidth required />
                    <TextField label="Password" type="password" variant="outlined" fullWidth required />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>

                    <Divider sx={{ my: 2 }}>OR</Divider>

                    <Button
                        variant="outlined"
                        color="inherit"
                        fullWidth
                        startIcon={<GoogleIcon />}
                    >
                        Sign in with Google
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
