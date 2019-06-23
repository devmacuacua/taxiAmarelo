import { verifyLogin, makeLogin, makeSignup, makeRecoveryPass } from '../screens/TaxiAmareloAPI';

export const checkLogin = () => {

    return (dispatch) => {
        verifyLogin().then(function (status) {
            dispatch({
                type: 'changeStatus',
                payload: {
                    status
                }
            });
        })
            .catch(function () {
                dispatch(
                    {
                        type: 'changeStatus',
                        payload: {
                            status: 2
                        }
                    }
                )
            });
    }
};

export const doLogin = (email, password) => {
    return (dispatch) => {
        makeLogin(email, password)
            .then(function (status) {
                if (status == 2) {
                    alert("Email/Password Errado!");
                }
                dispatch({
                    type: 'changeStatus',
                    payload: {
                        status
                    }
                }
                )
            }).catch(function () {
                alert("tente novamente mai9s Tarde");
            });
    }
};

export const setEmailField = (email) => {
    return {
        type: 'setEmailField',
        payload: {
            email
        }
    }
}

export const setPasswordField = (pass) => {
    return {
        type: 'setPasswordField',
        payload: {
            pass
        }
    }
}

export const setNameField = (name) => {
    return {
        type: 'setNameField',
        payload: {
            name
        }
    }
}


export const doSignup = (email, password, name) => {
    return (dispatch) => {
        makeSignup(email, password, name)
            .then(function (status) {
                if (status == 2) {
                    alert("Email ja esta cadastrado!");
                }
                dispatch({
                    type: 'changeStatus',
                    payload: {
                        status
                    }
                }
                )
            }).catch(function () {
                alert("tente novamente mai9s Tarde");
            });
    }
};



export const doRecoveryPass = (email) => {
    return (dispatch) => {
        makeRecoveryPass(email)
            .then(function (status) {
                alert("Uma Mensagem de Recuperacao Foi enviado para seu E-mail!");
            }).catch(function () {
                alert("Tente novamente mais tarde");
            });
    }
};