/* Load database & database configuration */
const database = require('../config/dbconfig');

/* Load bluebird Promise */
const Promise = require('bluebird');

/**
 * DAOs Common functions
 */
class Common {

    find(request) {
        return new Promise(function (resolve, reject) {
            database.db.all(request, function (err, rows) {
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

    findOne(request) {
        return new Promise(function (resolve, reject) {
            database.db.all(request, function (err, rows) {
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

    existsOne(request) {
        return new Promise(function (resolve, reject) {
            database.db.each(request, function (err, row) {
                if (err) {
                    reject({
                        'error': err
                    });
                }
                else if (row && row.found === 1) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            })
        });
    }

    run(request) {
        return new Promise(function (resolve, reject) {
            database.db.run(request, function (err) {
                if (this.changes === 1) {
                    resolve(true);
                } else {
                    reject(err);
                }
            })
        });
    }
}

module.exports = Common;