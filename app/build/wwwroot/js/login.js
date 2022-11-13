$(document).ready(function () {

    LogIn();
    inicio();
    LoadVehicules();
});

function LogIn() {
   
    var user = {
        email: $('#email_sing_up').val(),
        password: $('#password_sing_up').val()
    }

    if ($('#email_sing_up').val() != null) {
        LoginClient(user);

    }
}

function inicio() {
    //MENU
    $("#menu_parking").hide();
    $("#menu_vehicule").hide();
    $("#menu_users").hide();
    $("#menu_parkings").hide();
    $("#menu_vehicules").hide();
    $("#menu_sing_up").show();
    $("#menu_client").show();
    $("#menu_role").hide();
    $("#menu_create_role").hide();
    $("#menu_space").hide();
    $("#menu_add_client").hide();
    $("#AddRate").hide();
    
    
    //TBALES, FORMS, ETC
    $("#feature").show();
    $("#about").show();
    $("#AddParking").hide();
    $("#AddVehicule").hide();
    $("#Users").hide();
    $("#parking").hide();
    $("#vehicule").hide();
    $("#vehiculeUser").hide();
    $("#Role").hide();
    $("#Rate").hide();
    $("#menu_rate").hide();
    $("#AddRole").hide();
    $("#space").hide();
    $("#UpdateSpace").hide();
    $("#AddAdmin").hide();
    $("#AddDependet").hide();
    $("#Admin").hide();
    $("#Dependent").hide();
    $("#add_client").hide();
    $("#parking_client").hide();
    $("#spaceclient").hide();
    
    
    //BUTTONS
    $("#menu_log_out").hide();
    $("#btn_edit_user").hide();
    $("#btn_edit_parking").hide();
    $("#btn_modal_rate").hide();
    $("#btn_modal_role").hide();
    $("#btn_modal_rate_client").hide();
}

function prueba() {

    inicio();
}

function GetUserRole(emailUser) {

    $.ajax({
        url: "/User/Role",
        type: "POST",
        data: JSON.stringify(emailUser),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response == 1) {
                $('#loginLabbel').text("");
                //MENU
                $("#menu_sing_up").hide();
                $("#menu_client").hide();
                $("#menu_vehicule").show();
                $("#menu_vehicules").show()
                //FORMS, TBALES, ETC
                $("#feature").hide();
                $("#about").hide();
                $("#vehicule").show();
                $("#AddVehicule").show();
                $("#vehiculeUser").show();
                $("#vehicule").hide();
                $("#AddRate").hide();
                $("#parking_client").show();
                $("#spaceclient").show();
                
                //BUTTONS
                $("#menu_log_out").show();
                $("#btn_modal_rate_client").show();

            } else if (response == 2) {
                $('#loginLabbel').text("");
                //BUTTONS
                $("#menu_log_out").show();
                $("#btn_edit_user").show();
                $("#btn_edit_parking").show();
                $("#menu_space").show();
                //MENU
                $("#menu_sing_up").hide();
                $("#menu_client").hide();
                $("#menu_log_out").show();
                $("#menu_parking").show();
                $("#menu_users").show();
                $("#menu_parkings").show();
                $("#menu_role").show();
                $("#menu_create_role").show();
                $("#menu_add_client").show();
                $("#menu_vehicules").show();
                $("#menu_contact").hide();
                //FORMS, TBALES, ETC
                $("#feature").hide();
                $("#about").hide();
                $("#AddParking").show();
                 $("#vehicule").show();

                $("#Users").show();
                $("#parking").show();
                $("#menu_rate").show();
                $("#AddRole").show();
                $("#Role").show();
                $("#Rate").show();
                $("#space").show();
                $("#UpdateSpace").show();
                $("#add_client").show();
                
            } else if (response == 3) {

                $('#loginLabbel').text("");
                //BUTTONS
                $("#menu_log_out").show();
                $("#btn_edit_user").show();
                $("#btn_edit_parking").show();
                $("#menu_space").show();
                //MENU
                $("#menu_sing_up").hide();
                $("#menu_client").hide();
                $("#menu_log_out").show();
                $("#menu_users").show();
                $("#menu_parkings").show();
                $("#menu_add_client").show();
                $("#menu_vehicules").show();
                //FORMS, TBALES, ETC
                $("#feature").hide();
                $("#about").hide();
                $("#AddParking").hide();
                $("#parking").show();
                $("#Users").show();
                $("#space").show();
                $("#UpdateSpace").show();
                $("#AddDependet").hide();
                $("#AddAdmin").hide();
                $("#add_client").show();
                $("#vehicule").show();
                

            }
        },
        error: function (errorMessage) {
            if (errorMessage === "no connection") {
                $('#result').text("Error en la conexión.");
            }
        }
    });
}
function LoginClient(user) {
    $.ajax({
        url: "/User/LogInClient",
        type: "POST",
        data: JSON.stringify(user),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response == 1) {

                GetUserRole(user.email);
                GetdataSesion(user.email);

                $('#loginLabbel').text("Logged");
                $('#loginLabbel').css('color', 'green');
                $('#email_sing_up').val('');
                $('#password_sing_up').val('');
            }
            else {
                $('#loginLabbel').text("User no logged");
                $('#loginLabbel').css('color', 'red');
                $('#password_sing_up').val('');
            }
        },
        error: function (errorMessage) {
            if (errorMessage === "no connection") {
                $('#loginLabbel').text("Error en la conexión.");
            }
        }
    });
}


function GetdataSesion(emailUser) {

    var email = "";
    $.ajax({
        url: "/User/GetByEmail",
        type: "GET",
        data: { email: emailUser },
        success: function (result) {
            $('#idUserSesion').val(result.id);

            LoadVehiculesUser();
            //$('#rolUserSesion').val(result.rol);

        },
        error: function (errorMessage) {
            if (errorMessage === "no connection") {
                $('#result').text("Error en la conexión.");
            }
        }
    });
}


function LoadVehiculesUser() {

    var vehicule = {
        id_User: $('#idUserSesion').val(),
    }
    var user_id = {
        id: $('#idUserSesion').val()
    };

    vehicule.user = user_id;


    if (vehicule != null) {

        $.ajax({
            url: "/Vehicule/GetVehiculeUser",
            data: JSON.stringify(vehicule),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",

            success: function (result) {

                var html = '';
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.license_Plate + '</td>';
                    html += '<td>' + item.color + '</td>';
                    html += '<td>' + item.brand + '</td>';
                    html += '<td>' + item.vehicule_type.name + '</td>';
                    html += '<td><a href="" data-toggle="modal" id="btn_edit_user" data-target="#vehicule_modalU" onclick="GetVehiculeByLicensePlat(\'' + item.license_Plate + '\')">Edit</a> | <a href="#" onclick="Delete_Vehicule(' + item.id + ')">Delete</a></td>';

                    html += '</tr>';
                });

                $('#vehiculeUser-tbody').html(html);
            },
            error: function (errorMessage) {
                // alert(errorMessage.responseText);
            }
        });
    }
}


///////////VEHICULE////////////

function Add_Vehicule() {

    var vehicule = {
        license_Plate: $('#license_Plate').val(),
        color: $('#color').val(),
        brand: $('#brand').val(),
        id_User: $('#idUserSesion').val(),
        id_Type: parseInt($('#vehicule_Type').val())
    };

    var vehicule_type = {
        id: $('#vehicule_Type').val(),
        name: $('#vehicule_Type').find('option:selected').text()
    };

    var user_id = {
        id: $('#idUserSesion').val(),

    };

    vehicule.vehicule_type = vehicule_type;
    vehicule.user = user_id;

    if (vehicule != null) {

        $.ajax({
            url: "/Vehicule/Insert",
            data: JSON.stringify(vehicule),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                LoadVehiculesUser();
                LoadVehicules();
                $('#result_vehicule').text("Vehiculo añadido");
                $('#result_vehicule').css('color', 'green');
                $('#license_Plate').val('');
                $('#color').val('');
                $('#brand').val('');
                $('#vehicule_Type').val($("#vehicule_Type option:first").val());
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_vehicule').text("Error en la conexión.");
                }
                $('#result_vehicule').text("Vehicule not added");
                $('#result_vehicule').css('color', 'red');
            }
        });
    }
}


function Clear_Vehicule() {

    $('#license_Plate').val('');
    $('#color').val('');
    $('#brand').val('');
    $('#vehicule_Type').val($("#id_Type option:first").val());
}


function GetVehicules_Type() {

    $.ajax({
        url: "/Vehicule_Type/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<option value="' + item.id + '">' + item.name + '</option>';
            });
            $('#vehicule_Type').append(html);

            $('#type_editU').append(html);

            $('#type_spaceU').append(html);



        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}


function GetVehiculeByLicensePlat(vehiculeLicense_Plate) {

    var license_Plate = "";
    $.ajax({
        url: "/Vehicule/GetByLicensePlate",
        type: "GET",
        data: { license_Plate: vehiculeLicense_Plate },
        success: function (result) {
            $('#id_vehicule_editU').val(result.id);
            $('#plate_editU').val(result.license_Plate);
            $('#color_editU').val(result.color);
            $('#brand_editU').val(result.brand);
            $('#type_editU').val(result.vehicule_Type.id);
       
        },
        error: function (errorMessage) {
            if (errorMessage === "no connection") {
                $('#result').text("Error en la conexión.");
            }
            $('#result_vehicule').text("Vehicule not added");
            $('#result_vehicule').css('color', 'red');
        }
    });
}



function Update_VehiculeU() {
    var vehicule = {
        id: $('#id_vehicule_editU').val(),
        license_Plate: $('#plate_editU').val(),
        color: $('#color_editU').val(),
        brand: $('#brand_editU').val(),
        id_User: $('#idUserSesion').val(),
        id_Type: parseInt($('#type_editU').val())
    };

    var vehicule_type = {
        id: $('#type_editU').val(),
        name: $('#type_editU').find('option:selected').text()
    };

    var user_id = {
        id: $('#idUserSesion').val(),

    };

    vehicule.user = user_id;
    vehicule.vehicule_type = vehicule_type;

    if (vehicule != null) {

        $.ajax({
            url: "/Vehicule/Update",
            data: JSON.stringify(vehicule),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#result_vehiculeU').text("Actializado");
                $('#result_vehiculeU').css('color', 'green');
                $('#plate_editU').val('');
                $('#color_editU').val('');
                $('#brand_editU').val('');
                $('#type_editU').val($("#type_edit option:first").val());
                LoadVehiculesUser();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_vehicule').text("Error en la conexión.");
                }
                $('#result_vehicule').text("Vehicule not added");
                $('#result_vehicule').css('color', 'red');
            }
        });
    }
}


function LoadVehicules() {

    $.ajax({
        url: "/Vehicule/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.license_Plate + '</td>';
                html += '<td>' + item.color + '</td>';
                html += '<td>' + item.brand + '</td>';
                html += '<td>' + item.vehicule_type.name + '</td>';
                //html += '<td><a href="" data-toggle="modal" id="btn_edit_user" data-target="#vehicule_modal" onclick="GetVehiculeByLicensePlate(\'' + item.license_Plate + '\')">Edit</a> | <a href="#" onclick="Delete_Vehicule(' + item.id + ')">Delete</a></td>';

                html += '</tr>';
            });

            $('#vehicule-tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}