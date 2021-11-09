import React from 'react';
import Navigation from '../../shared/Navigation/Navigation';
import AppointmentHeader from '../AppointmentHeader/AppointmentHeader';
import AvailableAppoinment from '../AvailableAppoinment/AvailableAppoinment';

const Appointment = () => {
    const [date, setDate] = React.useState(new Date());
    return (
        <div>
            <Navigation></Navigation>
            <AppointmentHeader date={date} setDate={setDate}></AppointmentHeader>
            <AvailableAppoinment date={date}></AvailableAppoinment>
        </div>
    );
};

export default Appointment;