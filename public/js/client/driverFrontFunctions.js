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
            driver: {}
        },
        methods: {
            save: function () {
                var driver = {
                    'firstName': this.driver.firstName,
                    'lastName': this.driver.lastName,
                    'car': this.driver.car
                };
                create(driver, 'driver', function (error) {
                    if (error) {
                        console.log(error);
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
                id: null,
                firstName: null,
                lastName: null,
                car: null
            }
        },
        created: function () {
            var url = config.urlBase + '/api/driver/' + id;
            $.get(url, function (data) {
                this.driver.id = data.id;
                this.driver.firstName = data.firstName;
                this.driver.lastName = data.lastName;
                this.driver.car = data.car;
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
                if(data[0]) {
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
            driver: {}
        },
        created: function () {
            getOneServer(id, 'driver', function (data) {
                this.driver = data;
            }.bind(this))
        },
        methods: {
            save: function (event) {
                var driver = {
                    'id': this.driver.id,
                    'firstName': this.driver.firstName,
                    'lastName': this.driver.lastName,
                    'car': this.driver.car
                };
                update(driver, 'driver', function (error) {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    window.location.replace(config.urlBase + '/driver/show/' + this.driver.id);
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