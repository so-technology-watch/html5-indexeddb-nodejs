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

    /* List of our entities */
    var entities = [
        'car',
        'driver'
    ];

    /* Initial connection attempt to the server */
    connectionStatus(app);

    /* Every 5 seconds, we try to synchronise our databases */
    /*
     setInterval(function () {
     connectionStatus(app);
     syncDatabase(entities);
     }, 5000);
     */
});