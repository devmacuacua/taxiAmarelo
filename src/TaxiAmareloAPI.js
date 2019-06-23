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

export const makeSignup = function (email, password, name) {
    return new Promise(function (resolve, reject) {
        //temporariamente
        setTimeout(function () {
            let status = 2;
            resolve(status);
        }, 2000);
    });

};

export const makeRecoveryPass = function (email) {
    return new Promise(function (resolve, reject) {
        //temporariamente
        setTimeout(function () {
            let status = 2;
            resolve(status);
        }, 2000);
    });

};


export const makeLocationSearch = function (locTxt) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let array = [
                {
                    id: 1,
                    label: 'Avelida Eduardo Mondlane',
                    lat: -10,
                    long: -11
                },
                {
                    id: 2,
                    label: 'Amilcar Cabral',
                    lat: -10,
                    long: -11
                },
                {
                    id: 3,
                    label: 'Museu da Historia',
                    lat: -10,
                    long: -11
                },
            ];
            resolve(array);
        }, 500)
    })
}