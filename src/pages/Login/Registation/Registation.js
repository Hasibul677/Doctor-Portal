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

const Registation = () => {
    const [loginData, setLoginData] = useState({});
    const {user, creteAccountWithEmail, error, setError, isLoading, googleSignIn } = useAuth();
    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLogindata = { ...loginData };
        newLogindata[field] = value;
        setLoginData(newLogindata);
    }

    const handleLoginForm = e => {
        e.preventDefault();
        if (loginData.password !== loginData.password2) {
            setError("Password didn't match")
            return;
        }
         creteAccountWithEmail(loginData.email, loginData.password, loginData.name, history, location)
    };

    const handleGoogleSignIn=()=>{
        googleSignIn(location, history)
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ mt: 12, textAlign: 'center' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '25px', fontWeight: 600, fontFamily: 'cursive', mb: 5 }}>
                        Registration
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
                        <Button onClick={handleGoogleSignIn} variant="text"><Paper elevation={3}><GoogleIcon sx={{ p: 1, fontSize: '35px', marginTop: '7px' }} /></Paper></Button>
                        <Button variant="text"><Paper elevation={3}><FacebookIcon sx={{ p: 1, fontSize: '35px', marginTop: '7px' }} /></Paper></Button>

                    </Box>
                    {!isLoading && <form onSubmit={handleLoginForm}>
                        <TextField
                            style={{ width: '90%' }}
                            id="standard-basic"
                            label="Your Name"
                            name='name'          
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            style={{ width: '90%' }}
                            id="standard-basic"
                            label="Your Email"
                            name='email'
                            type='email'
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <TextField
                            style={{ width: '90%' }}
                            id="standard-basic"
                            label="Password"
                            name='password'
                            type='password'
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <TextField
                            style={{ width: '90%' }}
                            id="standard-basic"
                            label="Re-type Password"
                            name='password2'
                            type='password'
                            onBlur={handleOnBlur}
                            variant="standard" />
                        <Button sx={{ my: 3 }} type='submit' variant="contained">Register</Button>
                        <Typography variant='body1' sx={{ fontFamily: 'cursive', mb: 5 }}>
                            Already Register? <Link style={{ textDecoration: 'none' }} to='login'>Sign In</Link>
                        </Typography>
                    </form>}
                    {isLoading && <CircularProgress />}
                    {user.email && <Alert severity="success">Congratulation user added successfully !</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>
                <Grid item xs={4} md={6}>
                    <img style={{ height: '600px' }} src={login} alt="" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Registation;