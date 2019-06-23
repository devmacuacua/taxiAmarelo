export const verifyLogin = function () {
    return new Promise(function (resolve, reject) {
        //temporariamente
        setTimeout(function () {
            let status = 1;
            resolve(status);
        }, 2000);
    });
};

export const makeLogin = function (email, password) {
    return new Promise(function (resolve, reject) {
        //temporariamente
        setTimeout(function () {
            let status = 2;
            resolve(status);
        }, 2000);
    });

};

export const makeSignup= function (email, password,name) {
    return new Promise(function (resolve, reject) {
        //temporariamente
        setTimeout(function () {
            let status = 2;
            resolve(status);
        }, 2000);
    });

};

export const makeRecoveryPass= function (email) {
    return new Promise(function (resolve, reject) {
        //temporariamente
        setTimeout(function () {
            let status = 2;
            resolve(status);
        }, 2000);
    });

};