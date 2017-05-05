/**
 * SQLite Client application requests
 */

/* (CREATE) Add an Entity */
function addInSql(Entity, url, entityType, callback) {
    $.ajax({
        url: url + '/api/' + entityType + '/create',
        type: 'post',
        dataType: 'json',
        data: Entity,
        success: function (data) {
            callback(data);
        },
        error: function (error) {
            callback(error);
        }
    });
}

/* (UPDATE) Edit an Entity */
function updateInSql(Entity, url, entityType, callback) {
    $.ajax({
        url: url + '/api/' + entityType,
        type: 'put',
        dataType: 'json',
        data: Entity,
        success: function (data) {
            callback(data);
        },
        error: function (error) {
            callback(error);
        }
    });
}