/**
 * Driver Data Access Object
 */

/* Load database & database configuration */
const database = require('../Config/dbconfig');

/* Load Driver entity */
const Driver = require('../Model/DriverClass');

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

            database.db.each("SELECT id, firstName, lastName, car FROM driver WHERE id=" + id, function (err, row) {
                if (err) {
                    callback(err);
                }
                else {
                    let driver = new Driver(row.id, row.firstName, row.lastName, row.car);
                    callback(driver, true);
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

    database.db.all("SELECT * FROM driver", function (err, rows) {
        if (err) {
            callback(err);
        }
        else {
            let drivers = [];
            rows.forEach(function (row) {
                let driver = new Driver(row.id, row.firstName, row.lastName, row.car);
                drivers.push(driver);
            });
            callback(drivers);
        }
    });
};

/**
 * Counts all the records present in the database
 * @params callback
 * @return count
 */

let countAll = function (callback) {

    database.db.all("SELECT COUNT(*) AS count FROM driver", function (err, row) {
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
 * @params Driver, callback
 * @return true if the entity has been updated, false if not found and not updated
 */

let update = function (Driver, callback) {

    database.db.run("UPDATE driver SET " +
        "firstName='" + Driver.firstName + "', " +
        "lastName='" + Driver.lastName + "', " +
        "car='" + Driver.car + "' " +
        "WHERE id=" + id, function (err) {
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
 * @params Driver, callback
 * returns database insertion status
 */

let create = function (Driver, callback) {
    
    database.db.run("INSERT into driver (firstName, lastName, car) VALUES ('" +
        Driver.firstName + "','" +
        Driver.lastName + "','" +
        Driver.car + "')", function (err) {
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

    database.db.run("DELETE FROM driver WHERE id=" + id, function (err) {
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

    database.db.each("SELECT (count(*) > 0) as found FROM driver WHERE id=" + id, function (err, row) {
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