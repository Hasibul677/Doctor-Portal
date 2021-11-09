import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Alert, Button, Box } from '@mui/material';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess]= useState(false);
    const {token}= useAuth();

    const handleBlur=e=>{
        setEmail(e.target.value);
    }
    const handleAdminSubmit = e=>{
        e.preventDefault();
        const user={email}
        fetch('http://localhost:5000/users/admin',{
            method:'PUT',
            headers:{
                'authorization': `Bearer ${token}`,
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res=> res.json())
        .then(data=>{
            if(data.modifiedCount){
                setSuccess(true)
            }
        })
    }
    return (
        <div>
           <Box sx={{textAlign:'center'}}>
           <h1>Make an Admin</h1>
            <form onSubmit={handleAdminSubmit}>
            <TextField 
            sx={{width:'50%'}}
            type='email'
            label="Email" 
            onBlur={handleBlur}
            variant="standard" />
            <Button  sx={{mt:2, ml:2}} type='submit' variant='contained'>Make Admin</Button>
            </form>
            {success && <Alert severity="success">Made Admin successfully !</Alert>}
           </Box>
        </div>
    );
};

export default MakeAdmin;