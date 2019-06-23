import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

export class Home extends Component {

    static navigationOptions = {
        title: 'Taxi Amarelo',
        headerStyle: {
            backgroundColor: '#0A5360'
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 1
        }
    };

    render() {
        return (
            <View>
                <Text>Home</Text>
            </View>
        );
    }
}

const mapStateProps = (state) => {
    return {
        status: state.auth.status
    };
}

const HomeConnect = connect(mapStateProps, {})(Home);

export default HomeConnect;