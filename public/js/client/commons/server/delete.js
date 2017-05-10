/**
 * SQLite server API delete function
 * @params id, entityType, callback
 */
function deleteServer(id, entityType, callback) {
    $.ajax({
        url: config.urlBase + '/api/' + entityType + '/' + id,
        type: 'DELETE',
        async: true,
        success: function (data) {
            callback(data);
        },
        error: function (error) {
            callback(error);
        }
    });
}