import React from 'react';
import AppointmentBanner from './AppointmentBanner/AppointmentBanner';
import Services from '../Services/Services';
import Navigation from '../shared/Navigation/Navigation';
import Banner from './Banner/Banner';
import BannerContact from '../BannerContact/BannerContact';

const Home = () => {
    return (
        <div>
           <Navigation></Navigation>
            <Banner></Banner>
            <BannerContact></BannerContact>
           <Services></Services>
           <AppointmentBanner></AppointmentBanner>
        </div>
    );
};

export default Home;