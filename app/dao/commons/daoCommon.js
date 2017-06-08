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

    findAll(sqlRequest) {
        return new Promise(function (resolve, reject) {
            database.db.all(sqlRequest, function (err, rows) {
                if (err) {
                    reject(
                        new DaoError(500, "Internal server error")
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new DaoError(404, "Entity not found")
                    );
                } else {
                    resolve(rows);
                }
            })
        });
    }

    findOne(sqlRequest, sqlParams) {
        return new Promise(function (resolve, reject) {
            let stmt = database.db.prepare(sqlRequest);
            stmt.all(sqlParams, function (err, rows) {
                if (err) {
                    reject(
                        new DaoError(400, "Invalid arguments")
                    );
                } else if (rows === null || rows.length === 0) {
                    reject(
                        new DaoError(404, "Entity not found")
                    );
                } else {
                    let row = rows[0];
                    resolve(row);
                }
            })
        });
    }

    existsOne(sqlRequest, sqlParams) {
        return new Promise(function (resolve, reject) {
            let stmt = database.db.prepare(sqlRequest);
            stmt.each(sqlParams, function (err, row) {
                if (err) {
                    reject(
                        new DaoError(500, "Internal server error")
                    );
                } else if (row && row.found === 1) {
                    resolve(true);
                } else {
                    reject(
                        new DaoError(404, "Entity not found")
                    );
                }
            })
        });
    }

    run(sqlRequest, sqlParams, sqlRequest2 = null) {
        return new Promise(function (resolve, reject) {
            let stmt = database.db.prepare(sqlRequest);
            stmt.run(sqlParams, function () {
                if (this.changes === 1) {
                    if (sqlRequest2) {
                        let stmt2 = database.db.prepare(sqlRequest2);
                        stmt2.all({$id: this.lastID}, function (err, rows) {
                            if (err) {
                                reject(
                                    new DaoError(500, "Internal server error")
                                );
                            } else {
                                resolve(
                                    rows[0]
                                );
                            }
                        });
                    } else {
                        resolve(
                            new DaoError(201, "Success")
                        )
                    }
                } else if (this.changes === 0) {
                    reject(
                        new DaoError(404, "Entity not found")
                    )
                } else {
                    reject(
                        new DaoError(400, "Invalid arguments")
                    )
                }
            })
        });
    }

    forceErrorInvalid() {
        return new Promise(function (resolve) {
            resolve(
                new DaoError(400, "Invalid arguments")
            )
        });
    }
}

module.exports = Common;