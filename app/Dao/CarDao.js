/**
 * Car Data Access Object
 */

/* Load database & database configuration */
const database = require('../Config/dbconfig');

/* Load Car entity */
const Car = require('../Model/CarClass');

/**
 * Tries to find an entity using its Id / Primary Key
 * @params id, callback
 * @return entity
 */

let findById = function (id, callback) {

    /* First, we need to check if our entity exists in our database
     to prevent a infinite pending request if a user provides
     a wrong id that is still an integer */
    exists(id, function (status) {

        if (status === true) {

            database.db.each("SELECT id, maker, model, year, driver FROM car WHERE id=" + id, function (err, row) {
                if (err) {
                    callback(err, false);
                }
                else {
                    let car = new Car(row.id, row.maker, row.model, row.year, row.driver);
                    callback(car, true);
                }
            });
        }
        else {
            callback(status, 'error');
        }
    });
};

/**
 * Finds all entities.
 * @params callback
 * @return all entities
 */

let findAll = function (callback) {

    database.db.all("SELECT * FROM car", function (err, rows) {
        if (err) {
            callback(err);
        }
        else {
            let cars = [];
            rows.forEach(function (row) {
                let car = new Car(row.id, row.maker, row.model, row.year, row.driver);
                cars.push(car);
            });
            callback(cars);
        }
    });
};

/**
 * Counts all the records present in the database
 * @params callback
 * @return count
 */

let countAll = function (callback) {

    database.db.all("SELECT COUNT(*) AS count FROM car", function (err, row) {
        if (err) {
            callback(err);
        }
        else {
            callback(row[0]);
        }
    });
};

/**
 * Updates the given entity in the database
 * @params Car, callback
 * @return true if the entity has been updated, false if not found and not updated
 */

let update = function (Car, callback) {

    database.db.run("UPDATE car SET " +
        "maker='" + Car.maker + "', " +
        "model='" + Car.model + "', " +
        "year='" + Car.year + "', " +
        "driver='" + Car.driver + "' " +
        "WHERE id=" + Car.id, function (err) {
        if (err) {
            callback(err);
        }
        else {
            callback(true);
        }
    });
};

/**
 * Creates the given entity in the database
 * @params Car, callback
 * returns database insertion status
 */

let create = function (Car, callback) {

    database.db.run("INSERT into car (maker, model, year, driver) VALUES ('" +
        Car.maker + "','" +
        Car.model + "','" +
        Car.year + "','" +
        Car.driver + "')", function (err) {
        if (err) {
            callback(err);
        }
        else {
            callback(true);
        }
    });
};

/**
 * Deletes an entity using its Id / Primary Key
 * @params id, callback
 * returns database deletion status
 */

let deleteById = function (id, callback) {

    database.db.run("DELETE FROM car WHERE id=" + id, function (err) {
        if (err) {
            callback(err);
        }
        else {
            callback(true);
        }
    });
};

/**
 * Returns true if an entity exists with the given Id / Primary Key
 * @params id, callback
 * returns database entry existence status (true/false)
 */

let exists = function (id, callback) {

    database.db.each("SELECT (count(*) > 0) as found FROM car WHERE id=" + id, function (err, row) {
        if (row && row.found === 1) {
            callback(true);
        }
        else {
            callback(false);
        }
    });
};

module.exports = {
    findById: findById,
    findAll: findAll,
    countAll: countAll,
    update: update,
    create: create,
    deleteById: deleteById,
    exists: exists,
};