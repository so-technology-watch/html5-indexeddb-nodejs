/* Load Car Data Access Object */
const DriverDao = require('../dao/driverDao');
const driverDao = new DriverDao();

/* Load Driver entity */
const Driver = require('../model/driverClass');

/**
 * Driver Controller
 */
class DriverController {

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        driverDao.findById(id)
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
        driverDao.findAll()
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
        driverDao.countAll()
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
        let driver = new Driver(req.body.id, req.body.firstName, req.body.lastName, req.body.car);

        return driverDao.update(driver)
            .then(function () {
                res.status(201);
                res.json("Entity updated successfully");
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
        let driver = new Driver(0, req.body.firstName, req.body.lastName, req.body.car);

        return driverDao.create(driver)
            .then(function () {
                res.status(201);
                res.json("Entity created successfully");
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

        driverDao.deleteById(id)
            .then(function () {
                res.status(200);
                res.json("Entity deleted successfully");
            })
            .catch(function (error) {
                res.status(404);
                res.json("Entity not found : " + error);
            });
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        driverDao.exists(id)
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

module.exports = DriverController;