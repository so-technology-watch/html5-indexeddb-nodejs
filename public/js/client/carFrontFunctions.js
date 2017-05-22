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
            car: {}
        },
        methods: {
            save: function () {
                var car = {
                    'maker': this.car.maker,
                    'model': this.car.model,
                    'year': this.car.year,
                    'driver': this.car.driver
                };
                create(car, 'car', function (error) {
                    if (error) {
                        console.log(error);
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
                id: null,
                maker: null,
                model: null,
                year: null,
                driver: null
            }
        },
        created: function () {
            var url = config.urlBase + '/api/car/' + id;
            $.get(url, function (data) {
                this.car.id = data.id;
                this.car.maker = data.maker;
                this.car.model = data.model;
                this.car.year = data.year;
                this.car.driver = data.driver;
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
            car: {}
        },
        created: function () {
            getOneServer(id, 'car', function (data) {
                this.car = data;
            }.bind(this))
        },
        methods: {
            save: function (event) {
                var car = {
                    'id': this.car.id,
                    'maker': this.car.maker,
                    'model': this.car.model,
                    'year': this.car.year,
                    'driver': this.car.driver
                };
                update(car, 'car', function (error) {
                    if (error) {
                        console.log(error);
                        return;
                    }

                    window.location.replace(config.urlBase + '/car/show/' + this.car.id);
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