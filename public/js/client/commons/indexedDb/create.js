/* Prepares SQL & IndexedDB update */
function createIndexedDB(entity, entityType) {
    idbAddEntity(entity, entityType, function (data) {
        console.log("IndexedDb insertion successful");
    });
}