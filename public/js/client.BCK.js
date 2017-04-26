/**
 * Client application
 */

/* When the Client page has loaded */

$(document).ready(function () {

    /* Check if the client can connect to the server application */
    function pingServer(callback) {
        var status;
        $.ajax({
            url: '/ping',
            type: 'GET',
            async: true,
            success: function (data) {
                /* Ready for SQLite & IndexedDB insertion. */
                status = 0;
                callback(status, data.url);
            },
            error: function () {
                /* Ready for IndexedDB insertion only. */
                status = 1;
                callback(status);
            }
        });
    }

    /* Add a listener per form-submit-button */

    $("#saveCar").click(function (ev) {
        ev.preventDefault();

        /* Obtain form values to create a new Car */
        var car = {
            'id': 0,
            'maker': $("#new-car-maker").val(),
            'model': $("#new-car-model").val(),
            'year': $("#new-car-year").val(),
            'driver': $("#new-car-driver").val()
            //// 'lastModified': new Date().getTime()
        };

        /* We check if we are still connected to our server application */
        pingServer(function (status) {

            if (status === 0) {
                /* If we are, then insert the new Car in both IndexedDb and SQLite */
                addCarInSql(car, function (data) {
                    if (data.error === 'ok') {
                        console.log("SQLite insertion successful");
                    }
                    else {
                        console.log(data);
                    }
                });
                addCar(car, function () {
                    console.log("IndexedDb insertion successful");
                });
            }
            else {
                /* Else, we insert our new Car only in IndexedDb */
                addCar(car, function () {
                    console.log("IndexedDb insertion successful");
                });
            }
        });
    });

    $("#saveDriver").click(function (ev) {
        ev.preventDefault();

        /* Obtain form values to create a new Driver */
        var driver = {
            'id': 0,
            'lastName': $("#new-driver-firstname").val(),
            'firstName': $("#new-driver-lastname").val(),
            'car': $("#new-driver-car").val()
        };

        /* We check if we are still connected to our server application */
        pingServer(function (status) {

            if (status === 0) {
                /* If we are, then insert the new Driver in both IndexedDb and SQLite */
                addDriverInSql(driver, function (data) {
                    if (data.error === 'ok') {
                    }
                    else {
                        console.log("SQLite insertion successful");
                    }
                });
                addDriver(driver, function () {
                    console.log("IndexedDb insertion successful");
                });
            }
            else {
                /* Else, we insert our new Driver only in IndexedDb */
                addDriver(driver, function () {
                    console.log("IndexedDb insertion successful");
                });
            }
        });
    });

    /* First connection attempt to the server
     This way, we obtain the server url & port and display it to the client */
    pingServer(function (status, url) {
        if (status === 0) {
            $("#url").text(url);
            $("#dbStatusMessage").empty().html("<b>Server connection successful</b>").css("color", "green");
        }
    });

    /* Every 5 seconds, we synchronize our local database (IndexedDB) with the remote database (SQLite) */
    setInterval(function () {
        pingServer(function (status) {

            /* We check if we are still connected to our server application */
            if (status === 0) {

                $("#dbStatusMessage").empty().html("<b>Synchronising...</b>").css("color", "green");

                /* We read every car in our IndexedDb database */
                getAllCars(function (cars) {

                    var errors = 0;

                    /* to add them to our SQLite database */
                    cars.forEach(function (Car) {
                        addCarInSql(Car, function (data) {
                            if (data.error === 'ok') {
                            }
                            else {
                                errors = errors + 1;
                            }
                        });
                    });

                    if (errors === 0) {
                        $("#dbStatusMessage").empty().html("<b>Database synchronised</b>").css("color", "green");
                    }
                    else {
                        $("#dbStatusMessage").empty().html("<b>Database synchronisation error(s) : </b>" + errors).css("color", "red");
                    }
                });

                /* We read every driver in our IndexedDb database */
                getAllDrivers(function (drivers) {

                    var errors = 0;

                    /* to add them to our SQLite database */
                    drivers.forEach(function (Driver) {
                        addDriverInSql(Driver, function (data) {
                            if (data.error === 'ok') {
                            }
                            else {
                                errors = errors + 1;
                            }
                        });
                    });
                    if (errors === 0) {
                        $("#dbStatusMessage").empty().html("<b>Database synchronised</b>").css("color", "green");
                    }
                    else {
                        $("#dbStatusMessage").empty().html("<b>Database synchronisation error(s) : </b>" + errors).css("color", "red");
                    }
                });
            }
            /* If we can't connect to the server, then display it before trying again */
            else {
                $("#dbStatusMessage").empty().html("<b>Connection lost ! Attempting to reconnect...</b>").css("color", "red");
            }
        });
    }, 5000);
});