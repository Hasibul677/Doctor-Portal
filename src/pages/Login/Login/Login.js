import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import login from '../../../images/login.png';
import TextField from '@mui/material/TextField';
import { Button, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const {user, loginWithEmail, error, isLoading, googleSignIn } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLogindata = { ...loginData };
        newLogindata[field] = value;
        setLoginData(newLogindata);
    }

    const handleLoginForm = e => {
        e.preventDefault();
        loginWithEmail(loginData.email, loginData.password, location, history);
    };

    const handleGoogleSignIn=()=>{
        googleSignIn(location, history)
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ mt: 12, textAlign: 'center' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 600, fontFamily: 'cursive', mb: 5 }}>
                        Login
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 50,
                            height: 50,
                        },
                    }}>
                        <Button onClick={handleGoogleSignIn} variant="text"><Paper elevation={3}><GoogleIcon sx={{p: 1, fontSize: '35px', marginTop:'7px' }} /></Paper></Button>
                        <Button variant="text"><Paper elevation={3}><FacebookIcon sx={{p: 1, fontSize: '35px', marginTop:'7px' }} /></Paper></Button>

                    </Box>
                    {!isLoading && <form onSubmit={handleLoginForm}>
                        <TextField
                            style={{ width: '90%' }}
                            id="standard-basic"
                            label="Your Email"
                            name='email'
                            type='email'
                            onBlur={handleOnChange}
                            variant="standard" />

                        <TextField
                            style={{ width: '90%' }}
                            id="standard-basic"
                            label="Password"
                            name='password'
                            type='password'
                            onBlur={handleOnChange}
                            variant="standard" />
                        <Button sx={{ my: 3 }} type='submit' variant="contained">Sign In</Button>
                        <Typography variant='body1' sx={{ fontFamily: 'cursive', mb: 5 }}>
                        Are You New? <Link style={{textDecoration:'none'}} to='registration'>Register Now</Link>
                    </Typography>
                    </form>}
                    {isLoading && <CircularProgress />}
                    {user.email && <Alert severity="success">Login successfully !</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                   
                </Grid>
                <Grid item xs={4} md={6}>
                    <img style={{ height: '600px' }} src={login} alt="" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Login;