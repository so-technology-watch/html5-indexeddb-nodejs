/**
 * Driver Front functions
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

function showAllDriver() {

    return new Vue({
        el: '#driverPanel',
        data: {
            drivers: {}
        },
        created: function () {
            var url = config.urlBase + '/api/driver/';
            $.get(url, function (data) {
                this.drivers = data;
            }.bind(this));
        }
    });
}

function formEditDriver(id) {

    return new Vue({
        el: '#driverForm',
        data: {
            driver: {}
        },
        created: function () {
            var url = config.urlBase + '/api/driver/' + id;
            $.get(url, function (data) {
                this.driver = data;
            }.bind(this));
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

function deleteDriver(id) {
    var url = config.urlBase + '/api/driver/' + id;
    $.ajax({
        url: config.urlBase + '/api/driver/' + id,
        type: 'DELETE',
        async: true,
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
    idbDeleteEntity('driver', id, function () {
        window.location.replace(config.urlBase + '/driver');
    });
}