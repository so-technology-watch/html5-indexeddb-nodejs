/**
 * Car Controller
 */

/* Load Car Data Access Object */
const CarDao = require('../Dao/CarDao');
const carDao = new CarDao();

/* Load Car entity */
const Car = require('../Model/CarClass');

/**
 * Tries to find an entity using its Id / Primary Key
 * @params req, res
 * @return entity
 */

let findById = function (req, res) {

    let id = req.params.uid;

    carDao.findById(id)
        .then(function(result) {
            res.status(200);
            res.json(result);
        })
        .catch(function(error) {
            res.status(404);
            res.json(error);
        });
};

/**
 * Finds all entities.
 * @return all entities
 */
let findAll = function (req, res) {
    carDao.findAll()
        .then(function(results) {
            res.status(200);
            res.json(results);
        })
        .catch(function(error) {
            res.status(404);
            res.json(error);
        });
};

/**
 * Counts all the records present in the database
 * @return count
 */

let countAll = function (req, res) {
    carDao.countAll(function (count) {
        res.status(200);
        res.json(count);
    });
};

/**
 * Updates the given entity in the database
 * @params req, res
 * @return true if the entity has been updated, false if not found and not updated
 */

let update = function (req, res) {

    let car = new Car(req.body.id, req.body.maker, req.body.model, req.body.year, req.body.driver);

    carDao.update(car, function (result) {
        if (status === true) {
            res.status(200);
            res.json("Entity updated successfully");
        }
        else {
            res.status(404);
            res.json("Entity not found");
        }
    });
};

/**
 * Creates the given entity in the database
 * @params req, res
 * returns database insertion status
 */

let create = function (req, res) {

    let car = new Car(0, req.body.maker, req.body.model, req.body.year, req.body.driver);

    return carDao.create(car)
        .then(function (status) {
            res.status(201);
            res.json("Entity created successfully");
        })
        .catch(function(error) {
            res.status(400);
            res.json(status);
        });
};

/**
 * Deletes an entity using its Id / Primary Key
 * @params req, res
 * returns database deletion status
 */

let deleteById = function (req, res) {
    let id = req.params.uid;

    carDao.deleteById(id)
        .then(function(status) {
            res.status(200);
            res.json("Entity deleted successfully");
        })
        .catch(function(error) {
            res.status(404);
            res.json("Entity not found");
        });
};

/**
 * Returns true if an entity exists with the given Id / Primary Key
 * @params req, res
 * @return
 */

let exists = function (req, res) {

    let id = req.params.uid;

    carDao.exists(id, function (status) {
        res.status(200);
        res.json(status);
    });
};

module.exports = {
    findAll: findAll,
    findById: findById,
    countAll: countAll,
    create: create,
    deleteById: deleteById,
    exists: exists,
    update: update,
};