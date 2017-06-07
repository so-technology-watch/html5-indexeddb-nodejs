/**
 * IndexedDb Client configuration CRUD requests (using Dexie)
 */
const db = new Dexie("db_Car_Driver");
db.version(1).stores({
    car: '++car_id, maker, car_model, car_year',
    driver: '++driver_id, driver_lastName, driver_firstName, driver_car'
});

/* (CREATE) Add an Entity */
function idbAddEntity(Entity, entityType, callback) {
    delete Entity.id;

    if (entityType === 'car') {
        db.car.put(Entity).then(function () {
            callback();
        }).catch(function (error) {
            callback(error);
        })
    } else if (entityType === 'driver') {
        db.driver.put(Entity).then(function () {
            callback();
        }).catch(function (error) {
            callback(error);
        })
    }
}

/* (UPDATE) Update an Entity */
function idbUpdateEntity(Entity, entityType, callback) {
    if (entityType === 'car') {
        db.car.update(Entity.id, Entity).then(function () {
            callback();
        }).catch(function (error) {
            callback(error);
        })
    } else if (entityType === 'driver') {
        db.driver.update(Entity.id, Entity).then(function () {
            callback();
        }).catch(function (error) {
            callback(error);
        })
    }
}

/* (DELETE) Delete an Entity by Id */
function idbDeleteEntity(entityType, id, callback) {
    if (entityType === 'car') {
        db.car.delete(id).then(function () {
            callback();
        }).catch(function (error) {
            console.log(error);
        })
    } else if (entityType === 'driver') {
        db.driver.delete(id).then(function () {
            callback();
        }).catch(function (error) {
            console.log(error);
        })
    }
}
/* (READ) Get all entities */
function idbGetAllEntities(entityType, callback) {
    if (entityType === 'car') {
        db.car.toArray()
            .then(function (entities) {
                callback(entities)
            })
    } else if (entityType === 'driver') {
        db.driver.toArray()
            .then(function (entities) {
                callback(entities)
            })
    }

}