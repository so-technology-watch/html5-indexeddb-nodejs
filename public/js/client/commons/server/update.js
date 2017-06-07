/**
 * Prepares SQL & IndexedDB update
 * @params entity, entityType, callback
 */
function updateServer(entity, entityType, id, callback) {
    var url = config.urlBase + '/api/' + entityType + '/' + id;

    $.ajax({
        url: url,
        type: 'put',
        dataType: 'json',
        data: entity,
        success: function (data) {
            callback(null, data);
        },
        error: function (error) {
            callback(error);
        }
    });
}