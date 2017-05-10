/**
 * SQLite server API task function
 * @param func
 */
function serverTask(func) {
    // We check if we are still connected to our server application
    pingServer(function (status, url) {
        if (status !== 0) {
            console.error('Disconnected');
        }
        else {
            func();
        }
    });
}