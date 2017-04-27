/* Load Car Data Access Object */
const CarDao = require('../dao/carDao');
const carDao = new CarDao();

/* Load Car entity */
const Car = require('../model/carClass');

/**
 * Car Controller
 */
class CarController {

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        carDao.findById(id)
            .then(function (result) {
                res.status(200);
                res.json(result);
            })
            .catch(function (error) {
                res.status(404);
                res.json(error);
            });
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(req, res) {
        carDao.findAll()
            .then(function (results) {
                res.status(200);
                res.json(results);
            })
            .catch(function (error) {
                res.status(404);
                res.json(error);
            });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(req, res) {
        carDao.countAll()
            .then(function (result) {
                res.status(200);
                res.json(result);
            })
            .catch(function (error) {
                res.status(404);
                res.json(error);
            });
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let car = new Car(req.body.id, req.body.maker, req.body.model, req.body.year, req.body.driver);

        return carDao.update(car)
            .then(function () {
                res.status(201);
                res.json({
                    'updated': true
                });
            })
            .catch(function (error) {
                res.status(400);
                res.json(error);
            });
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let car = new Car(0, req.body.maker, req.body.model, req.body.year, req.body.driver);

        return carDao.create(car)
            .then(function () {
                res.status(201);
                res.json({
                    'created': true
                });
            })
            .catch(function (error) {
                res.status(400);
                res.json(error);
            });
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        carDao.deleteById(id)
            .then(function () {
                res.status(200);
                res.json({
                    'deleted': true
                });
            })
            .catch(function () {
                res.status(404);
                res.json({
                    'notFound': true
                });
            });
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        carDao.exists(id)
            .then(function () {
                res.status(200);
                res.json(true);
            })
            .catch(function () {
                res.status(404);
                res.json(false);
            });
    };
}

module.exports = CarController;