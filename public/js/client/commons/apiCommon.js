/**
 * Client common api functions
 */

/**
 * Check if the client can connect to the server application
 * @param callback
 */
function pingServer(callback) {
    var status;
    $.ajax({
        url: '/ping',
        type: 'GET',
        async: true,
        success: function (data) {
            // Ready for SQLite & IndexedDB insertion.
            status = 0;
            callback(status, data.url);
        },
        error: function () {
            // Ready for IndexedDB insertion only.
            status = 1;
            callback(status);
        }
    });
}

/**
 * Uses pingServer function to display server connection status
 * @param app
 */
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

/**
 * Display connection status, server url & port to the client
 * @params app, url, message
 */
function displayHome(app, url, message) {
    app.message = message;
    app.url = url;
}

// Synchronise IndexedDB & SQLite databases
function syncDatabase() {

    serverTask(function () {
        // For each entity type (car, driver...)
        for (const entityType of config.entities) {

            // We read every entity in our IndexedDb database
            idbGetAllEntities(entityType, function (idbEntities) {

                // We read every entity in our SQLite database
                getAllServer(entityType, function (sqlEntities) {

                    // For each IndexedDB entity, we check if it is also present in our SQLite database
                    for (var i = 0; i < idbEntities.length; i++) {

                        var result = $.grep(sqlEntities, function (e) {
                            return e.id === idbEntities[i].id;
                        });

                        if (result.length === 0) {
                            // if not found in SQL, then we add it
                            createServer(idbEntities[i], entityType, function (data) {
                                console.log(data);
                            })

                        } else {
                            // if found in SQL, then do nothing for now (later : check a timestamp value for update)
                            // console.log('found')
                            // later : access the entity id property using result[0].id
                        }
                    }
                    // For each SQLite entity, we check if it is also present in our IndexedDB database
                    for (var j = 0; j < sqlEntities.length; j++) {

                        var result = $.grep(idbEntities, function (e) {
                            return e.id === sqlEntities[j].id;
                        });

                        if (result.length === 0) {
                            // if not found in IndexedDB, then we delete it from SQLite
                            deleteServer(sqlEntities[j].id, entityType, function (data) {
                                console.log(data);
                            })
                        }
                    }
                });
            });
        }
    });
}