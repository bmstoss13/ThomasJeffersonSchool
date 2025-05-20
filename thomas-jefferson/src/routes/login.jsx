import { useState } from 'react';
import '../styles/login.css';
import { Container, Typography, TextField, Button, Divider, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from "firebase/firestore";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //this will help when we click login -> dashboard
    const navigate = useNavigate();

    const userInput = async (e) => {
        e.preventDefault(); // prevents page refresh

        //checks to see if we have something in there and it is never null
        if (username.trim() === '' || password.trim() === '') {
            alert("Please enter correct details");
            return;
        }

        try {
            //getting the data from firebase
            const querySnapShot = await getDocs(collection(db, "adminAccess"));
            const data = querySnapShot.docs.map(doc => doc.data());

            const sameAsDatabase = data.find(user =>
                user.username === username && user.password === password
            );

            if (sameAsDatabase) {
                // alert("Login successful!"); //check to see if it works 
                navigate('/dashboard');

            } else {
                alert("Try again");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Error during login");
        }
    };

    //this shows the different buttons and fields for login
    return (
        <div className="login-page">
            <Container className="login-container">
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Welcome
                </Typography>

                <Box component="form" className="myForm" onSubmit={userInput}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>

                    <Divider sx={{ my: 2 }}>OR</Divider>

                    <Button
                        variant="outlined"
                        color="inherit"
                        fullWidth
                        startIcon={<GoogleIcon />} //appears black and white because of MUI
                    >
                        Sign in with Google
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
