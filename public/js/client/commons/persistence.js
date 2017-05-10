/**
 * Prepares SQL & IndexedDB modifications
 * @params entity, entityType, callback
 */
function update(entity, entityType, callback) {
    updateIndexedDB(entity, entityType);
    serverTask(function () {
        updateServer(entity, entityType, callback);
    });
}

function create(entity, entityType, callback) {
    createIndexedDB(entity, entityType);
    serverTask(function () {
        createServer(entity, entityType, callback);
    });
}