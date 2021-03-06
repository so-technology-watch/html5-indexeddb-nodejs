/* Load Driver Data Access Object */
const DriverDao = require('../dao/driverDao');

/* Load Controller Common function */
const controllerCommon = require('./common/controllerCommon');

/* Load Driver entity */
const Driver = require('../model/driver');

/**
 * Driver Controller
 */
class DriverController {

    constructor() {
        this.driverDao = new DriverDao();
        this.common = new controllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.driver_id;
        this.driverDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.driverDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {
        this.driverDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let driver = new Driver();

        if (req.body.driver_firstName !== '' && req.body.driver_lastName !== '') {
            driver.driver_id = req.body.driver_id;
            driver.driver_firstName = req.body.driver_firstName;
            driver.driver_lastName = req.body.driver_lastName;
            driver.driver_car = req.body.driver_car;
        } else {
            return this.driverDao.forceErrorInvalid()
                .then(this.common.serverError(res));
        }
        return this.driverDao.update(driver)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let driver = new Driver();
        if (req.body.driver_id) {
            driver.id = req.body.driver_id;
        }
        driver.driver_firstName = req.body.driver_firstName;
        driver.driver_lastName = req.body.driver_lastName;
        driver.driver_car = req.body.driver_car;

        if (req.body.driver_id) {
            return this.driverDao.createWithId(driver)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        } else {
            return this.driverDao.create(driver)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.driver_id;

        this.driverDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.driver_id;

        this.driverDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = DriverController;