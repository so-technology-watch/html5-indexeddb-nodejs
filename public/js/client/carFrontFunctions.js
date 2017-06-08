/**
 * Car Front functions
 */

/**
 * Adds entity creation vue form
 * @returns {*}
 */
function formAddCar() {

    return new Vue({
        el: '#carForm',
        data: {
            car: {},
            error: {
                errorCode: null,
                message: null
            }
        },
        methods: {
            save: function () {
                var car = {
                    'car_maker': this.car.car_maker,
                    'car_model': this.car.car_model,
                    'car_year': this.car.car_year
                };
                create(car, 'car', function (err) {
                    if (err) {
                        this.error.errorCode = 'Error ' + err.responseJSON.errorCode;
                        this.error.message = err.responseJSON.message + '.';
                        $('#warningMessage').css('display', 'flex');
                        return;
                    }
                    window.location.replace(config.urlBase + '/car/');
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
function showCar(id) {

    return new Vue({
        el: '#carPanel',
        data: {
            car: {
                car_id: null,
                car_maker: null,
                car_model: null,
                car_year: null
            }
        },
        created: function () {
            var url = config.urlBase + '/api/car/' + id;
            $.get(url, function (data) {
                this.car.car_id = data.car_id;
                this.car.car_maker = data.car_maker;
                this.car.car_model = data.car_model;
                this.car.car_year = data.car_year;
            }.bind(this));
        }
    });
}

/**
 * Adds all entities in a vue instance
 * @returns {*}
 */
function showAllCar() {

    return new Vue({
        el: '#carPanel',
        data: {
            cars: {}
        },
        created: function () {
            getAllServer('car', function (data) {
                    if(data[0]) {
                        this.cars = data;
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
function formEditCar(id) {

    return new Vue({
        el: '#carForm',
        data: {
            car: {},
            error: {
                errorCode: null,
                message: null
            }
        },
        created: function () {
            getOneServer(id, 'car', function (data) {
                this.car = data;
            }.bind(this))
        },
        methods: {
            save: function (event) {
                var car = {
                    'car_id': this.car.car_id,
                    'car_maker': this.car.car_maker,
                    'car_model': this.car.car_model,
                    'car_year': this.car.car_year
                };
                update(car, 'car', this.car.car_id, function (err) {
                    if (err) {
                        this.error.errorCode = 'Error ' + err.responseJSON.errorCode;
                        this.error.message = err.responseJSON.message + '.';
                        $('#warningMessage').css('display', 'flex');
                        return;
                    }

                    window.location.replace(config.urlBase + '/car/show/' + this.car.car_id);
                }.bind(this));
            }
        }
    });
}

/**
 * IndexedDB & SQLite Entity deletion function
 * @param id
 */
function deleteCar(id) {
    deleteServer(id, 'car', function (data) {
        idbDeleteEntity('car', id, function () {
            window.location.replace(config.urlBase + '/car');
        });
    });
}