/**
 * Driver Front functions
 */

/**
 * Adds entity creation vue form
 * @returns {*}
 */
function formAddDriver() {

    return new Vue({
        el: '#driverForm',
        data: {
            driver: {},
            error: {
                errorCode: null,
                message: null,
                display: "none",
            }
        },
        methods: {
            save: function () {
                var driver = {
                    'driver_firstName': this.driver.driver_firstName,
                    'driver_lastName': this.driver.driver_lastName,
                    'driver_car': this.driver.driver_car
                };
                create(driver, 'driver', function (err) {
                    if (err) {
                        this.error.errorCode = 'Error ' + err.responseJSON.errorCode;
                        this.error.message = err.responseJSON.message + '.';
                        this.error.display = "flex";
                        return;
                    }
                    window.location.replace(config.urlBase + '/driver/');
                }.bind(this));
            }
        }
    });
}

/**
 * Adds entity details in a vue instance
 * @param id
 * @returns {*}
 */
function showDriver(id) {

    return new Vue({
        el: '#driverPanel',
        data: {
            driver: {
                driver_id: null,
                driver_firstName: null,
                driver_lastName: null,
                driver_car: null
            }
        },
        created: function () {
            var url = config.urlBase + '/api/driver/' + id;
            $.get(url, function (data) {
                this.driver.driver_id = data.driver_id;
                this.driver.driver_firstName = data.driver_firstName;
                this.driver.driver_lastName = data.driver_lastName;
                this.driver.driver_car = data.driver_car;
            }.bind(this));
        }
    });
}

/**
 * Adds all entities in a vue instance
 * @returns {*}
 */
function showAllDriver() {

    return new Vue({
        el: '#driverPanel',
        data: {
            drivers: {}
        },
        created: function () {
            getAllServer('driver', function (data) {
                if (data[0]) {
                    this.drivers = data;
                }
            }.bind(this))
        }
    });
}

/**
 * Adds entity edition vue form
 * @param id
 * @returns {*}
 */
function formEditDriver(id) {

    return new Vue({
        el: '#driverForm',
        data: {
            driver: {},
            error: {
                errorCode: null,
                message: null,
                display: "none",
            }
        },
        created: function () {
            getOneServer(id, 'driver', function (data) {
                this.driver = data;
            }.bind(this))
        },
        methods: {
            save: function (event) {
                var driver = {
                    'driver_id': this.driver.driver_id,
                    'driver_firstName': this.driver.driver_firstName,
                    'driver_lastName': this.driver.driver_lastName,
                    'driver_car': this.driver.driver_car
                };
                update(driver, 'driver', this.driver.driver_id, function (err) {
                    if (err) {
                        this.error.errorCode = 'Error ' + err.responseJSON.errorCode;
                        this.error.message = err.responseJSON.message + '.';
                        this.error.display = "flex";
                        return;
                    }

                    window.location.replace(config.urlBase + '/driver/show/' + this.driver.driver_id);
                }.bind(this));
            }
        }
    });
}

/**
 * IndexedDB & SQLite Entity deletion function
 * @param id
 */
function deleteDriver(id) {
    deleteServer(id, 'driver', function (data) {
        idbDeleteEntity('driver', id, function () {
            window.location.replace(config.urlBase + '/driver');
        });
    });
}