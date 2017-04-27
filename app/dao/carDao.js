/* Load Car entity */
const Car = require('../model/CarClass');

/* Load DAO Common functions */
const Common = require('./common');
const common = new Common();

/**
 * Car Data Access Object
 */
class CarDao {

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let request = "SELECT id, maker, model, year, driver FROM car WHERE id=" + id;
        return common.findOne(request).then(row =>
            new Car(row.id, row.maker, row.model, row.year, row.driver)
        );
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let request = "SELECT * FROM car";
        return common.find(request).then(rows => {
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
        return common.findOne(request);
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
        return common.run(request);
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
        return common.run(request);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let request = "DELETE FROM car WHERE id=" + id;
        return common.run(request);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let request = "SELECT (count(*) > 0) as found FROM car WHERE id=" + id;
        return common.existsOne(request);
    };
}

module.exports = CarDao;