/* Prepares SQL & IndexedDB update */
function createServer(entity, entityType, callback) {
    var url = config.urlBase + '/api/' + entityType + '/create';

    $.ajax({
        url: url,
        type: 'post',
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