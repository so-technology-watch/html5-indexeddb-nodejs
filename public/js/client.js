/**
 * Client application
 */

/* When the Client page has loaded */
$(document).ready(function () {

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

    /* First connection attempt to the server
     This way, we obtain the server url & port and display it to the client */
    pingServer(function (status, url) {
        if (status === 0) {
            var app = new Vue({
                el: '#dbStatusMessage',
                data: {
                    message: 'Server connection successful',
                    url: url
                }
            })
        }
    });
});