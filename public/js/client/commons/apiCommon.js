/**
 * Client common api functions
 */

/* Check if the client can connect to the server application */
function pingServer(callback) {
    var status;
    $.ajax({
        url: '/ping',
        type: 'GET',
        async: true,
        success: function (data) {
            /* Ready for SQLite & IndexedDB insertion. */
            status = 0;
            callback(status, data.url);
        },
        error: function () {
            /* Ready for IndexedDB insertion only. */
            status = 1;
            callback(status);
        }
    });
}

/* Uses pingServer function to display server connection status*/
function connectionStatus(app) {
    pingServer(function (status, url) {
        if (status === 0) {
            let message = 'Server connection successful';
            displayHome(app, message, url);
        } else {
            let message = 'Server connection lost. Synchronizing...';
            displayHome(app, message, url);
        }
    })
}

/* Display connection status, server url & port to the client */
function displayHome(app, url, message) {
    app.message = message;
    app.url = url;
}

//TODO : rework this with the correct functions names + search about avoiding multiple mass connections when syncing
/* Synchronise IndexedDB & SQLite databases */
function syncDatabase(entityTypes) {

    serverTask(function () {
        updateServer(entity, entityType, callback);
    });

    pingServer(function (status, url) {
        if (status === 0) {

            /* For each entity type (car, driver...) */
            for (const entityType of entityTypes) {

                /* We read every entity in our IndexedDb database */
                idbGetAllEntities(entityType, function (entities) {

                    /* to add or update them to our SQLite database */
                    for (var entity of entities) {

                        /* we first check if our entity is already in our SQLite database,
                         * if not, we add it */
                        //TODO : Add delete function if entry is not in IDB but is in SQLite

                        checkInSql(entity.id, url, entityType, function (data) {
                            if (data === true) {
                                updateInSql(entity, url, entityType, function (data) {
                                    // TODO : Add error handling : console.log(data);
                                });
                            } else {
                                addInSql(entity, url, entityType, function (data) {
                                    // TODO : Add error handling : console.log(data);
                                });
                            }
                        });
                    }
                })
            }
        } else {
            // do nothing if not connected, we'll try again in 5 seconds
        }
    });
}