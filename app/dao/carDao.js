/* Load Car entity */
const Car = require('../model/car');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Car Data Access Object
 */
class CarDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let request = "SELECT id, maker, model, year, driver FROM car WHERE id=" + id;
        return this.common.findOne(request).then(row =>
            new Car(row.id, row.maker, row.model, row.year, row.driver));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let request = "SELECT * FROM car";
        return this.common.find(request).then(rows => {
            let cars = [];
            for (const row of rows) {
                cars.push(new Car(row.id, row.maker, row.model, row.year, row.driver));
            }
            return cars;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let request = "SELECT COUNT(*) AS count FROM car";
        return this.common.findOne(request);
    };

    /**
     * Updates the given entity in the database
     * @params Car
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Car) {
        let request = "UPDATE car SET " +
            "maker='" + Car.maker + "', " +
            "model='" + Car.model + "', " +
            "year='" + Car.year + "', " +
            "driver='" + Car.driver + "' " +
            "WHERE id=" + Car.id;
        return this.common.run(request);
    };

    /**
     * Creates the given entity in the database
     * @params Car
     * returns database insertion status
     */
    create(Car) {
        let request = "INSERT into car (maker, model, year, driver) VALUES ('" +
            Car.maker + "','" +
            Car.model + "','" +
            Car.year + "','" +
            Car.driver + "')";
        return this.common.run(request);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let request = "DELETE FROM car WHERE id=" + id;
        return this.common.run(request);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let request = "SELECT (count(*) > 0) as found FROM car WHERE id=" + id;
        return this.common.existsOne(request);
    };
}

module.exports = CarDao;