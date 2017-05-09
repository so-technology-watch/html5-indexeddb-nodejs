/* Prepares SQL & IndexedDB update */
function updateServer(entity, entityType, callback) {
    var url = config.urlBase + '/api/' + entityType + '/' + entity.id;

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