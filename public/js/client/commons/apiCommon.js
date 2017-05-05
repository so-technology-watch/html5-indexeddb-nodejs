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

/* Prepares apiURL fetch ALL entity */
function fetchAll(entityType) {
    pingServer(function (status, url) {
        if (status === 0) {
            var apiURL = url + '/api/' + entityType;
            displayEntityList(apiURL, entityType)
        }
        else {
            //NO CONNECTION TO REMOTE DATABASE
        }
    });
}

/* Prepares apiURL fetch ONE entity */
function fetchOne(entityType, id) {
    pingServer(function (status, url) {
        if (status === 0) {
            var apiURL = url + '/api/' + entityType + '/' + id;
            displayEntityList(apiURL, entityType)
        }
        else {
            //NO CONNECTION TO REMOTE DATABASE
        }
    });
}

/* Fetches data on our API, then displays it */
function displayEntityList(apiURL, entityType) {
    new Vue({
        el: '#entityList',
        data: {
            entityType: entityType,
            items: []
        },
        created: function () {
            this.fetchData();
        },
        methods: {
            fetchData: function () {
                var self = this;
                $.get(apiURL, function (data) {
                    self.items = data;
                });
            }
        }
    });
}