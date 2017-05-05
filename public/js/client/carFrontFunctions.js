/**
 * Car Front functions
 */
function carFrontAdd(entityType) {
    $(document).ready(function () {

        /* Add a listener to the form-submit-button */
        $("#saveCar").click(function (ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();

            /* Obtain form values to create a new Car */
            var car = {
                'id': 0,
                'maker': $("#inputCarMaker").val(),
                'model': $("#inputCarModel").val(),
                'year': $("#inputCarYear").val(),
                'driver': $("#inputCarDriver").val()
            };
            prepareSQLAdd(car, entityType);
        });
    });
}

function carFrontUpdate(entityType, id) {
    $(document).ready(function () {

        /* Add a listener to the form-submit-button */
        $("#saveCar").click(function (ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();

            /* Obtain form values to create a new Car */
            var car = {
                'id': id,
                'maker': $("#inputCarMaker").val(),
                'model': $("#inputCarModel").val(),
                'year': $("#inputCarYear").val(),
                'driver': $("#inputCarDriver").val()
            };
            prepareSQLUpdate(car, entityType);
        });
    });
}

function carFrontDelete(url, entityType, id) {
    idbDeleteEntity(entityType, id, function () {
        window.location.replace(url + '/' + entityType);
    });
}