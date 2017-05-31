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
        let sqlRequest = "SELECT car_id, car_maker, car_model, car_year FROM car WHERE car_id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Car(row.car_id, row.car_maker, row.car_model, row.car_year));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM car";
        return this.common.findAll(sqlRequest).then(rows => {
            let cars = [];
            for (const row of rows) {
                cars.push(new Car(row.car_id, row.car_maker, row.car_model, row.car_year));
            }
            return cars;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM car";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Car
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Car) {
        let sqlRequest = "UPDATE car SET " +
            "car_maker=$maker, " +
            "car_model=$model, " +
            "car_year=$year " +
            "WHERE car_id=$id";

        let sqlParams = {
            $maker: Car.car_maker,
            $model: Car.car_model,
            $year: Car.car_year,
            $id: Car.car_id,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Car
     * returns database insertion status
     */
    create(Car) {
        let sqlRequest = "INSERT into car (car_maker, car_model, car_year) " +
            "VALUES ($maker, $model, $year)";
        let sqlParams = {
            $maker: Car.car_maker,
            $model: Car.car_model,
            $year: Car.car_year
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Car
     * returns database insertion status
     */
    createWithId(Car) {
        let sqlRequest = "INSERT into car (car_id, car_maker, car_model, car_year) " +
            "VALUES ($id, $maker, $model, $year)";
        let sqlParams = {
            $id: Car.id,
            $maker: Car.car_maker,
            $model: Car.car_model,
            $year: Car.car_year
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM car WHERE car_id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM car WHERE car_id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = CarDao;