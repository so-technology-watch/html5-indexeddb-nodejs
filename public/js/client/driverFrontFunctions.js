/**
 * Driver Front functions
 */
function driverFrontAdd(entityType) {
    $(document).ready(function () {

        /* Add a listener to the form-submit-button */
        $("#saveDriver").click(function (ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();

            /* Obtain form values to create a new Driver */
            var driver = {
                'id': 0,
                'firstName': $("#inputDriverFirstName").val(),
                'lastName': $("#inputDriverLastName").val(),
                'car': $("#inputDriverCar").val()
            };
            prepareSQLAdd(driver, entityType);
        });
    });
}

function driverFrontUpdate(entityType, id) {
    $(document).ready(function () {

        /* Add a listener to the form-submit-button */
        $("#saveDriver").click(function (ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();

            /* Obtain form values to create a new Driver */
            var driver = {
                'id': id,
                'firstName': $("#inputDriverFirstName").val(),
                'lastName': $("#inputDriverLastName").val(),
                'car': $("#inputDriverCar").val()
            };
            prepareSQLUpdate(driver, entityType);
        });
    });
}