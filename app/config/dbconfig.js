/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./db.sqlite3');

/* Init car and driver tables if they don't exist */
let init = function () {

    db.run("CREATE TABLE if not exists car (" +
        "car_id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "car_maker TEXT NOT NULL," +
        "car_model TEXT NOT NULL," +
        "car_year DATE NOT NULL"+
        ");");

    db.run("CREATE TABLE if not exists driver (" +
        "driver_id INTEGER PRIMARY KEY AUTOINCREMENT," +
        "driver_firstName TEXT NOT NULL," +
        "driver_lastName TEXT NOT NULL," +
        "car_id INTEGER," +
        "FOREIGN KEY(car_id) REFERENCES car(car_id) ON DELETE SET NULL" +
        ");");

    db.run ("PRAGMA foreign_keys=ON; ");
};

module.exports = {
    init: init,
    db: db
};