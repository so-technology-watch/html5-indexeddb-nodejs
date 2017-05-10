/**
 * SQLite server API get all entities function
 * @params entityType, callback
 */
function getAllServer(entityType, callback) {
    var url = config.urlBase + '/api/' + entityType;
    $.ajax({
        url: url,
        type: 'get',
        success: function (data) {
            callback(data);
        },
        error: function (error) {
            callback(error);
        }
    });
}