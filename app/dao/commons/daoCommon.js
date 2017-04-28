/* Load database & database configuration */
const database = require('../../config/dbconfig');

/* Load bluebird Promise */
const Promise = require('bluebird');

/* Load DAO Error entity */
const DaoError = require('./daoError');

/**
 * DAOs Common functions
 */
class Common {

    find(request) {
        return new Promise(function (resolve, reject) {
            database.db.all(request, function (err, rows) {
                if (err) {
                    reject(
                        new DaoError(20, "Internal server error")
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new DaoError(21, "Entity not found")
                    );
                } else {
                    resolve(rows);
                }
            })
        });
    }

    findOne(request) {
        return new Promise(function (resolve, reject) {
            database.db.all(request, function (err, rows) {
                if (err) {
                    reject(
                        new DaoError(11, "Invalid arguments")
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new DaoError(21, "Entity not found")
                    );
                } else {
                    let row = rows[0];
                    resolve(row);
                }
            })
        });
    }

    existsOne(request) {
        return new Promise(function (resolve, reject) {
            database.db.each(request, function (err, row) {
                if (err) {
                    reject(
                        new DaoError(20, "Internal server error")
                    );
                } else if (row && row.found === 1) {
                    resolve(true);
                } else {
                    reject(
                        new DaoError(21, "Entity not found")
                    );
                }
            })
        });
    }

    run(request) {
        return new Promise(function (resolve, reject) {
            database.db.run(request, function () {
                if (this.changes === 1) {
                    resolve(true);
                } else if (this.changes === 0) {
                    reject(
                        new DaoError(21, "Entity not found")
                    )
                }
                else {
                    reject(
                        new DaoError(11, "Invalid arguments")
                    )
                }
            })
        });
    }
}

module.exports = Common;