import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Platform, PermissionsAndroid, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions'

import SearchBox from '../components/Home/SearchBox'

const GOOGLE_MAPS_APIKEY = "AIzaSyDk4_pjtKTzlZsJfccOLjHLjhOnUikgjNY";

export class Home extends Component {
    watchId = null;

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
            mapLocation:{
                latitude: -25.8960873,
                longitude: 32.5404721,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            },
            currentLocation: {
                latitude: -25.8960873,
                longitude: 32.5404721
            },

            destinLocation: {
                latitude: 0,
                longitude: 0,
            },
            isLoading: false,
            loadingMsg: '',
            warnHeight: new Animated.Value(0),
            recenterMapActive:true
        };

        this.setWarning = this.setWarning.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.requestLocPermission = this.requestLocPermission.bind(this);
        this.SearchBoxClick = this.SearchBoxClick.bind(this);
        this.realignMap = this.realignMap.bind(this);
        this.mapRegionChange=this.mapRegionChange.bind(this);
    }

    componentDidMount() {
        this.getCurrentLocation();
        // Geolocation.clearWatch(this.watchId);//para para se quiser
    }

    realignMap() {
        this.map.fitToSuppliedMarkers(['OriginMarker', 'DestinationMarker'], {
            edgePadding: {
                left: 100,
                top: 200,
                right: 100,
                bottom: 100
            },
            animated: true
        });
    }

    getCurrentLocation = async () => {
        this.setWarning(true, 'Procurando Sua Localizacao...');
        if (await this.requestLocPermission()) {
            this.watchId = Geolocation.watchPosition(
                (position) => {
                    this.setWarning(false, '');
                    this.setState({
                        currentLocation: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    });

                    this.realignMap();

                },
                (error) => {
                    this.setWarning(false, '');
                    alert("Erro na busca da localizacao: " + error.message);
                },
                {
                    enableHighAccuracy: true,
                    interval: 1000,
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

    SearchBoxClick(item) {
        this.setState(
            {
                destinLocation: {
                    latitude: item.latitude,
                    longitude: item.longitude,
                }
            }
        );

        setTimeout(() => {
            this.realignMap();
        }, 1000);

    }

    mapRegionChange(region){
      this.setState({
        mapLocation:region
      });
    }
  
    render() {
        return (
            <View style={styles.container}>
                <MapView
                    ref={obj => this.map = obj}
                    style={styles.map}
                    region={this.state.mapLocation}
                    
                    onRegionChangeComplete={this.mapRegionChange}
                    >

                    <MapView.Marker image={require('../assets/person-loc-pin.png')} identifier="OriginMarker" coordinate={this.state.currentLocation} />
                    {
                        this.state.destinLocation.latitude != 0 &&
                        <MapView.Marker image={require('../assets/map_marker-512.png')} identifier="DestinationMarker" coordinate={this.state.destinLocation} />
                    }
                    {
                        this.state.destinLocation.latitude != 0 &&
                        <MapViewDirections
                            origin={this.state.currentLocation}
                            destination={this.state.destinLocation}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={8}
                            strokeColor="#000000"
                        />

                    }

                </MapView>

                <Animated.View style={[styles.warnBox, { height: this.state.warnHeight }]}   >
                    <Text style={styles.warnText}>
                        {this.state.loadingMsg}
                    </Text>
                </Animated.View>

                <SearchBox dataClick={this.SearchBoxClick} />

                {this.state.recenterMapActive &&
                    <TouchableHighlight style={styles.recenterMap} onPress={this.realignMap}>
                        <Image style={styles.recenterMapImage} source={require('../assets/person-map-center-pin.png')}/>
                    </TouchableHighlight>
                }
               
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
    },
    recenterMap: {
        position:'absolute',
        right:20,
        bottom:20,
        width:64,
        height:64,
    },
    recenterMapImage: {
        width:64,
        height:64,
    }
});

const mapStateProps = (state) => {
    return {
        status: state.auth.status
    };
}

const HomeConnect = connect(mapStateProps, {})(Home);
export default HomeConnect;


