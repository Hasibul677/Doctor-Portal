import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAuth from '../../../hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const BookingModal = ({ openBooking, handleClose, booking, date, setBookingSucccess}) => {
    const { name, time } = booking;
    const {user}= useAuth();
    const initialInfo ={patientName: user.displayName, email: user.email, phone:''}
    const [bookingInfo, setBookingInfo] = useState(initialInfo);

    
    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newInfo ={...bookingInfo}
        newInfo[field]= value;
        setBookingInfo(newInfo)
    }

    const handleBookingForm = e => {
        e.preventDefault();
       const appointment ={
           ...bookingInfo, 
           time, 
           serviceName:name, 
           date: date.toLocaleDateString()
       }
       //send to server
       fetch('http://localhost:5000/appointments',{
           method: 'POST',
           headers:{
               'content-type':'application/json'
           },
           body: JSON.stringify(appointment)
       })
       .then(res=> res.json())
       .then(data => {
           if(data.insertedId){
            setBookingSucccess(true);
            handleClose();
           }
       })
       
    }


    return (
        <Modal
            keepMounted
            open={openBooking}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{ mb: 3 }} id="keep-mounted-modal-title" variant="h6" component="h2">
                    {name}
                </Typography>

                <form onSubmit={handleBookingForm}>
                    <TextField
                        disabled
                        sx={{ m: 1, width: '90%' }}
                        id="outlined-size-small"
                        defaultValue={time}
                        size="small"
                    />
                    <TextField
                        sx={{ m: 1, width: '90%' }}
                        id="outlined-size-small"
                        name='patientName'
                        onBlur={handleOnBlur}
                        defaultValue={user.displayName}
                        size="small"
                    />
                    <TextField
                        sx={{ m: 1, width: '90%' }}
                        id="outlined-size-small"
                        name='email'
                        onBlur={handleOnBlur}
                        defaultValue={user.email}
                        size="small"
                    />
                    <TextField
                        sx={{ m: 1, width: '90%' }}
                        id="outlined-size-small"
                        name='phone'
                        onBlur={handleOnBlur}
                        placeholder='Phone Number'
                        size="small"
                    />
                    <TextField
                    disabled
                        sx={{ m: 1, width: '90%' }}
                        id="outlined-size-small"
                        value={date.toDateString()}
                        size="small"
                    />
                    <Button sx={{ ml: 1 }} type='submit' variant="contained">Submit</Button>
                </form>

            </Box>
        </Modal>
    );
};

export default BookingModal;