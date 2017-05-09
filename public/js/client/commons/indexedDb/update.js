/* Prepares SQL & IndexedDB update */
function updateIndexedDB(entity, entityType) {
    idbUpdateEntity(entity, entityType, function (data) {
        console.log("IndexedDb update successful");
    });
}