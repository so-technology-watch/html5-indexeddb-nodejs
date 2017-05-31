/**
 * Driver Entity (ES6 Class)
 */

class Driver {
    constructor(id, firstName, lastName, car) {
        this.driver_id = id;
        this.driver_firstName = firstName;
        this.driver_lastName = lastName;
        this.driver_car = car;
    }
}

module.exports = Driver;