/**
 * Client application
 */

/* When the Client page has loaded */
$(document).ready(function () {

    /* Initialize Vue Home app */
    var app = new Vue({
        el: '#homeMessage',
        data: {
            message: '',
            url: '',
        }
    });

    /* Initial connection attempt to the server */
    connectionStatus(app);

    /* Every 5 seconds, we try to connect to the server */
    setInterval(function () {
        connectionStatus(app);
    }, 5000);

});