/* Load database & database configuration */
const database = require('../Config/dbconfig');

/* Load Car entity */
const Car = require('../Model/CarClass');

const Promise  = require('bluebird');

/**
 * Car Data Access Object
 */
module.exports = class {

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id, callback
     * @return entity
     */
    findById(id) {
        let request = "SELECT id, maker, model, year, driver FROM car WHERE id=" + id;
        return
            findOne(request).then(row =>
                new Car(row.id, row.maker, row.model, row.year, row.driver)
            );
    };

    /**
     * Finds all entities.
     * @params callback
     * @return all entities
     */
    findAll(callback) {
        return find("SELECT * FROM car").then(rows => {
            let cars = [];
            for (const row of rows) {
                cars.push(new Car(row.id, row.maker, row.model, row.year, row.driver));
            }
            return cars;
        });
    };

    /**
     * Counts all the records present in the database
     * @params callback
     * @return count
     */
    countAll(callback) {
        database.db.all("SELECT COUNT(*) AS count FROM car", function (err, row) {
            if (err) {
                callback(err);
            } else {
                callback(row[0]);
            }
        });
    };

    /**
     * Updates the given entity in the database
     * @params Car, callback
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Car, callback) {
        database.db.run("UPDATE car SET " +
            "maker='" + Car.maker + "', " +
            "model='" + Car.model + "', " +
            "year='" + Car.year + "', " +
            "driver='" + Car.driver + "' " +
            "WHERE id=" + Car.id, function (err) {
            if (err) {
                callback(err);
            } else {
                callback(true);
            }
        });
    };

    /**
     * Creates the given entity in the database
     * @params Car, callback
     * returns database insertion status
     */
    create(Car, callback) {
        return run("INSERT into car (maker, model, year, driver) VALUES ('" +
            Car.maker + "','" +
            Car.model + "','" +
            Car.year + "','" +
            Car.driver + "')");
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id, callback
     * returns database deletion status
     */
    deleteById(id) {
        return run("DELETE FROM car WHERE id=" + id);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id, callback
     * returns database entry existence status (true/false)
     */
    exists(id, callback) {
        let request = "SELECT (count(*) > 0) as found FROM car WHERE id=" + id;
        database.db.each(request, function (err, row) {
            if (row && row.found === 1) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }
};

function find(request) {
    return new Promise(function(resolve, reject) {
        database.db.all(request, function(err, rows) {
            if (err) {
                reject({
                    'error': err
                });
            } else if (rows === null || rows.length === 0) {
                reject({
                    'notFound': true
                });
            } else {
                resolve(rows);
            }
        })
    });
}

function findOne(request) {
    return new Promise(function(resolve, reject) {
        database.db.all(request, function(err, rows) {
            if (err) {
                reject({
                    'error': err
                });
            } else if (rows === null || rows.length === 0) {
                reject({
                    'notFound': true
                });
            } else {
                let row = rows[0];
                resolve(row);
            }
        })
    });
}

function run(request) {
    return new Promise(function(resolve, reject) {
        database.db.run(request, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        })
    });
}