/**
 * Car Front functions
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

function showAllCar() {

    return new Vue({
        el: '#carPanel',
        data: {
            cars: {}
        },
        created: function () {
            var url = config.urlBase + '/api/car/';
            $.get(url, function (data) {
                this.cars = data;
            }.bind(this));
        }
    });
}

function formEditCar(id) {

    return new Vue({
        el: '#carForm',
        data: {
            car: {}
        },
        created: function () {
            var url = config.urlBase + '/api/car/' + id;
            $.get(url, function (data) {
                this.car = data;
            }.bind(this));
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

function deleteCar(id) {
    var url = config.urlBase + '/api/car/' + id;
    $.ajax({
        url: config.urlBase + '/api/car/' + id,
        type: 'DELETE',
        async: true,
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
    idbDeleteEntity('car', id, function () {
        window.location.replace(config.urlBase + '/car');
    });
}