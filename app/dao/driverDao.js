/* Load Driver entity */
const Driver = require('../model/driver');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Driver Data Access Object
 */
class DriverDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let request = "SELECT id, firstName, lastName, car FROM driver WHERE id=" + id;
        return this.common.findOne(request).then(row =>
            new Driver(row.id, row.firstName, row.lastName, row.car));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let request = "SELECT * FROM driver";
        return this.common.find(request).then(rows => {
            let drivers = [];
            for (const row of rows) {
                drivers.push(new Driver(row.id, row.firstName, row.lastName, row.car));
            }
            return drivers;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let request = "SELECT COUNT(*) AS count FROM driver";
        return this.common.findOne(request);
    };

    /**
     * Updates the given entity in the database
     * @params Driver
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Driver) {
        let request = "UPDATE driver SET " +
            "firstName='" + Driver.firstName + "', " +
            "lastName='" + Driver.lastName + "', " +
            "car='" + Driver.car + "' " +
            "WHERE id=" + Driver.id;
        return this.common.run(request);
    };

    /**
     * Creates the given entity in the database
     * @params Driver
     * returns database insertion status
     */
    create(Driver) {
        let request = "INSERT into driver (firstName, lastName, car) VALUES ('" +
            Driver.firstName + "','" +
            Driver.lastName + "','" +
            Driver.car + "')";
        return this.common.run(request);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let request = "DELETE FROM driver WHERE id=" + id;
        return this.common.run(request);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let request = "SELECT (count(*) > 0) as found FROM driver WHERE id=" + id;
        return this.common.existsOne(request);
    };
}

module.exports = DriverDao;