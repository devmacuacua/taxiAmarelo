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
                    label: 'Eduardo Mondlane',
                    lat: -25959040,
                    lng: 32584395
                },
                {
                    id: 2,
                    label: '24 de julho',
                    lat: -25.9652418,
                    lng: 32.570671
                },
                {
                    id: 3,
                    label: 'Karl Marx',
                    lat: -25.9638396,
                    lng: 32.573418
                },
            ];
            resolve(array);
        }, 500)
    })
}