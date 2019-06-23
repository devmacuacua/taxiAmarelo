import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from './Home';

const HomeNav = createStackNavigator({
    Home: {
        screen: Home
    }
});

export default HomeNav;
