/**
 * SQLite Client application requests
 */

/* (CREATE) Add a Car */

function addCarInSql(Car, callback) {
    $.get("/updateCar?" +
        "carId=" + Car.id +
        "&carMaker=" + Car.maker +
        "&carModel=" + Car.model +
        "&carYear=" + Car.year +
        "&carDriver=" + Car.driver +
        "&carLastModified=" + Car.lastModified
        , function (data) {
            callback(data);
        });
}

/* (CREATE) Add a Driver */

function addDriverInSql(Driver, callback) {
    $.get("/updateDriver?driverId=" + Driver.id +
        "&driverLastName=" + Driver.lastName +
        "&driverFirstName=" + Driver.firstName +
        "&driverCar=" + Driver.car +
        "&driverLastModified=" + Driver.lastModified
        , function (data) {
            callback(data);
        });
}