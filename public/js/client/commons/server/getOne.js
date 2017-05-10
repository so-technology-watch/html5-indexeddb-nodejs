/* SQLite server API get one entity function */
function getOneServer(id, entityType, callback) {
    var url = config.urlBase + '/api/' + entityType + '/' + id;
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