/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init car and driver tables if they don't exist */
let init = function () {

    db.run("CREATE TABLE if not exists car (" +
        "car_id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "car_maker TEXT," +
        "car_model TEXT," +
        "car_year DATE"+
        ");");

    db.run("CREATE TABLE if not exists driver (" +
        "driver_id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "driver_firstName TEXT," +
        "driver_lastName TEXT," +
        "car_id INTEGER," +
        "FOREIGN KEY(car_id) REFERENCES car(car_id)" +
        ");");

    db.run ("PRAGMA foreign_keys=ON; ");
};

module.exports = {
    init: init,
    db: db
};