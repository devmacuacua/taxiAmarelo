import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Platform, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export class Home extends Component {
    watchId=null;

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

    constructor(props) {
        super(props);
        this.state = {
            currentLocation: {
                latitude: -25.8960873,
                longitude: 32.5404721,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            },

            isLoading: false,
            loadingMsg: '',
            warnHeight: new Animated.Value(0)
        };

        this.setWarning = this.setWarning.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.requestLocPermission = this.requestLocPermission.bind(this);
    }

    componentDidMount() {
        this.getCurrentLocation();
       // Geolocation.clearWatch(this.watchId);//para para se quiser
    }

    getCurrentLocation = async () => {
        this.setWarning(true, 'Procurando Sua Localizacao...');
        if (await this.requestLocPermission()) {
            this.watchId=Geolocation.watchPosition(
                (position) => {
                    this.setWarning(false, '');
                    this.setState({
                        currentLocation: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.004,
                            longitudeDelta: 0.004
                        }
                    });
                },
                (error) => {
                    this.setWarning(false, '');
                    alert("Erro na busca da localizacao: " + error.message);
                },
                {
                    enableHighAccuracy: true,
                    interval:1000,
                    timeout: 15000,
                    maximumAge: 5000
                }
            )
        }
        else {
            this.setWarning(false, '');
        }
    }

    requestLocPermission = async () => {
        if (Platform.OS == 'android') {
            try {
                const g = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Pegar localizacao',
                        message: 'Este aplicativo precisa aceder a sua localizacao'
                    }
                );

                if (g == PermissionsAndroid.RESULTS.GRANTED) {
                    return true;
                } else {
                    return false;
                }

            } catch (e) {
                return false;
            }
        } else {
            return true;
        }
    }


    setWarning(status, msg) {
        if (status === true && msg != '') {
            this.setState({
                isLoading: status,
                loadingMsg: msg
            });
            Animated.timing(
                this.state.warnHeight,
                {
                    toValue: 30,
                    duration: 1000
                }).start();
        }
        else if (status === false) {
            this.setState({
                isLoading: status,
            });
            Animated.timing(
                this.state.warnHeight,
                {
                    toValue: 0,
                    duration: 1000
                }).start();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    region={this.state.currentLocation}>
                </MapView>

                <Animated.View style={[styles.warnBox, { height: this.state.warnHeight }]}   >
                    <Text style={styles.warnText}>
                        {this.state.loadingMsg}
                    </Text>
                </Animated.View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    },
    warnBox: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    warnText: {
        fontSize: 13,
        color: '#FFFFFF'
    }
});

const mapStateProps = (state) => {
    return {
        status: state.auth.status
    };
}

const HomeConnect = connect(mapStateProps, {})(Home);
export default HomeConnect;


