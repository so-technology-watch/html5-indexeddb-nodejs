/**
 * SQLite Client application requests
 */

/* (READ) Checks if an Entity exists */
function checkInSql(id, url, entityType, callback) {
    $.ajax({
        url: url + '/api/' + entityType + '/exists/' + id,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function (error) {
            callback(error);
        }
    });
}