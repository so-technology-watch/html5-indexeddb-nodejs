/**
 * Car Entity (ES6 Class)
 */

class Car {
    constructor(id, maker, model, year, driver) {
        this.car_id = id;
        this.car_maker = maker;
        this.car_model = model;
        this.car_year = year;
    }
}

module.exports = Car;