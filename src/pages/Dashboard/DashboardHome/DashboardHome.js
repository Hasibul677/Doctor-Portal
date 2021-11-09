import * as React from 'react';
import { Grid } from '@mui/material';
import Calender from '../../shared/Calender/Calender';
import Appoinments from '../Appoinments/Appoinments';

const DashboardHome = () => {
    const [date, setDate] = React.useState(new Date())

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Calender
                    date={date}
                    setDate={setDate}></Calender>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Appoinments date={date} />
            </Grid>

        </Grid>
    );
};

export default DashboardHome;