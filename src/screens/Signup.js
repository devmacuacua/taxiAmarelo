import React, { Component } from 'react';
import { ScrollView, View, Text, ImageBackground, StyleSheet, TextInput, Image, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';
import { setEmailField, setPasswordField, setNameField, doSignup } from '../actions/AuthActions'

class Signup extends Component {

    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#0F6675'
        },
        headerTintColor: '#FFFFFF'
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.signupAction = this.signupAction.bind(this);
        this.verifyStatus = this.verifyStatus.bind(this);
    }

    signupAction() {
        if (this.props.emailValid == true
            && this.props.passValid == true
            && this.props.nameValid == true) {
            //  alert("Botao Apertado");
            this.props.doSignup(this.props.email, this.props.pass, this.props.name);
        }
    }

    componentDidUpdate() {
        this.verifyStatus();
    }

    verifyStatus() {
        if (this.props.status === 1) {
            this.props.navigation.dispatch(StackActions.reset(
                {
                    index:0,
                    actions:[
                        NavigationActions.navigate({routeName:'HomeNav'})
                    ]
                }
            ))
        }
    }


    render() {
        let buttonOpacity = 0.2;
        if (this.props.emailValid == true
            && this.props.passValid == true
            && this.props.nameValid == true) {
            buttonOpacity = 1;
        }
        return (
            <ImageBackground source={require('../assets/bg3.png')} style={styles.container}>

                <ScrollView style={styles.scrollViewStyle}>

                    <KeyboardAvoidingView style={styles.keyboardConatiner} behavior="padding" enabled>

                        <Text style={styles.header}>Registo</Text>

                        <View style={styles.fieldArea}>
                            <Text style={styles.fieldTitle}>Nome     </Text>
                            <View style={styles.fieldItemArea}>
                                <TextInput style={styles.fieldItem}
                                    value={this.props.name}
                                    onChangeText={(text) => this.props.setNameField(text)} />
                                <View style={styles.fieldItemStatus}>
                                    {
                                        this.props.nameValid &&
                                        <Image style={styles.fieldItemStatusImg}
                                            source={require('../assets/checked.png')}>
                                        </Image>
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={styles.fieldArea}>
                            <Text style={styles.fieldTitle}>E-mail      </Text>
                            <View style={styles.fieldItemArea}>
                                <TextInput style={styles.fieldItem}
                                    value={this.props.email}
                                    onChangeText={(text) => this.props.setEmailField(text)} />
                                <View style={styles.fieldItemStatus}>
                                    {
                                        this.props.emailValid &&
                                        <Image style={styles.fieldItemStatusImg}
                                            source={require('../assets/checked.png')}>
                                        </Image>
                                    }
                                </View>
                            </View>
                        </View>

                        <View style={styles.fieldArea}>
                            <Text style={styles.fieldTitle}>Password
                    </Text>
                            <View style={styles.fieldItemArea}>
                                <TextInput style={styles.fieldItem}
                                    secureTextEntry={true}
                                    value={this.props.pass}
                                    onChangeText={(text) => this.props.setPasswordField(text)} />
                                <View style={styles.fieldItemStatus}>
                                    {
                                        this.props.passValid &&
                                        <Image style={styles.fieldItemStatusImg}
                                            source={require('../assets/checked.png')}>
                                        </Image>
                                    }
                                </View>
                            </View>
                        </View>

                    </KeyboardAvoidingView>

                </ScrollView>



                <TouchableHighlight underlayColor={null}
                    style={[styles.button, { opacity: buttonOpacity }]}
                    onPress={this.signupAction}>
                    <Image style={styles.buttonImage}
                        source={require('../assets/next.png')}>
                    </Image>
                </TouchableHighlight>


            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    scrollViewStyle: {
        flex: 1
    },
    keyboardConatiner: {
        flex: 1
    },
    header: {
        color: '#FFFFFF',
        fontSize: 30,
        marginBottom: 50
    },
    fieldTitle: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    fieldItem: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 17,
    },
    fieldArea: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF'
    },
    fieldItemArea: {
        flexDirection: 'row',
        height: 50
    },
    fieldItemStatus: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fieldItemStatusImg: {
        width: 25,
        height: 25,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0A5360',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonImage: {
        width: 50,
        height: 50,
    },
    bArea: {
        flexDirection: 'row'
    },
    bText: {
        flex: 1,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bTextInt: {
        color: '#FFF',
        fontSize: 15
    }

});

const mapStateToProps = (state) => {
    return {
        status: state.auth.status,
        email: state.auth.email,
        pass: state.auth.pass,
        name: state.auth.name,
        emailValid: state.auth.emailValid,
        passValid: state.auth.passValid,
        nameValid: state.auth.nameValid,
    }
}

const SignupConnect = connect(mapStateToProps, { setEmailField, setPasswordField, setNameField, doSignup })(Signup);
export default SignupConnect;