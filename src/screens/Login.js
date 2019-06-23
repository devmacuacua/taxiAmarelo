import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TextInput, Image, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import { connect } from 'react-redux';
import { setEmailField, setPasswordField, doLogin } from '../actions/AuthActions'


class Login extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {};

        this.loginAction = this.loginAction.bind(this);
        this.verifyStatus = this.verifyStatus.bind(this);

        this.goToSignup=this.goToSignup.bind(this);
        this.goToRecoveryPass=this.goToRecoveryPass.bind(this);
    }

    loginAction() {
        if (this.props.emailValid == true && this.props.passValid == true) {
            //  alert("Botao Apertado");
            this.props.doLogin(this.props.email, this.props.pass);
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

    goToSignup(){
        this.props.navigation.navigate('Signup');
    }
    goToRecoveryPass(){
        this.props.navigation.navigate('RecoveryPass');
    }


    render() {
        let buttonOpacity = 0.2;
        if (this.props.emailValid == true && this.props.passValid == true) {
            buttonOpacity = 1;
        }
        return (
            <ImageBackground source={require('../assets/bg3.png')} style={styles.container}>

                <KeyboardAvoidingView style={styles.keyboardConatiner} behavior="padding" enabled>

                    <Text style={styles.header}>Login</Text>

                    <View style={styles.fieldArea}>
                        <Text style={styles.fieldTitle}>E-mail
                    </Text>
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

                    <View style={styles.bArea}>
                        <TouchableHighlight
                            underlayColor={null}
                            onPress={this.goToRecoveryPass}
                            style={styles.bText}>
                            <Text style={styles.bTextInt}> Esqueceu a senha?</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={null}
                            onPress={this.goToSignup}
                            style={styles.bText}>
                            <Text style={styles.bTextInt}>  Registar-se </Text>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight underlayColor={null}
                        style={[styles.button, { opacity: buttonOpacity }]}
                        onPress={this.loginAction}>
                        <Image style={styles.buttonImage}
                            source={require('../assets/next.png')}>
                        </Image>
                    </TouchableHighlight>

                </KeyboardAvoidingView>

            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
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
        bottom: 0,
        right: 0,
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
        emailValid: state.auth.emailValid,
        passValid: state.auth.passValid
    }
}

const LoginConnect = connect(mapStateToProps, { setEmailField, setPasswordField, doLogin })(Login);
export default LoginConnect;