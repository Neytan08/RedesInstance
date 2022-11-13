// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {

    GetVehicules_Type();
  
    LoadUsers();
    LoadParking();
    LoadParking2();
    LoadRole();
    validationsAbout();
    GetVehicules()
    LoadRate();
    LoadRate2();

    $(document).on('submit', '#rate-entry-form', function () {

        if ($('#id_rate').val() == 0) {

            Add_Rate();
        } else {

            Update_Rate();
        }
        return false;
    });




    $(document).on('submit', '#space-entry-form', function () {

        if ($('#id_space').val() == 0) {

            Update_Space();
        } else {

            Update_Space();
        }
        return false;
    });

    $(document).on('submit', '#student-entry-form', function () {

        if ($('#id').val() == 0) {

            Add();
        } else {

            Update_User();
        }
        return false;
    });

    $(document).on('submit', '#student2-entry-form', function () {

        if ($('#id2').val() == 0) {

            Add2();
        } else {

            Update();
        }
        return false;
    });


    $(document).on('submit', '#rol-entry-form', function () {

        if ($('#id_rol').val() != 0) {

            Add_Role();
        } else {

            Update_Role();
        }
        return false;
    });
    $(document).on('submit', '#parking-entry-form', function () {

        if ($('#id_parking').val() == 0) {

            Add_Parking();
        } else {

            Update_Parking();
        }
        return false;
    });



    $(document).on('submit', '#vehicule-entry-form', function () {

        if ($('#id_vehicule').val() == 0) {

            Add_Vehicule();
        } else {

            Update_Vehicule();
        }
        return false;
    });



});



/////////////////////////Validations/////////////////////////////////////

function blanks(name, email, password) {
    if (name.length == 0 || email.length == 0 || password.length == 0) {
        //swal('Debe llenar todos los espacios');
        return false;
    }
    return true;
}

function validate_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

function validate_password(password) { 
    if (password.length >= 8) { 
        var uppercase = false;
        var lowercase = false;
        var numero = false;
        var character = false;

        for (var i = 0; i < password.length; i++) {
            if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
                uppercase = true;
            }
            else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
                lowercase = true;
            }
            else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
                number = true;
            }
            else {
                character = true;
            }
        }
        if (uppercase == true && lowercase == true && character == true && number == true) {
            return true;
        }
    }
    return false;
}

function validationsAbout() {

    if (blanks(document.getElementById("name").value, document.getElementById("email").value, document.getElementById("password").value)) { //Si no hay ningun campo en blanco
        if (validate_email(document.getElementById("email").value)) {
            if (validate_password(document.getElementById("password").value)) { 
                Add();
            }
            else {
                swal('La contraseña debe tener mayúsculas, minúsculas, un carácter y números.');
            }
        }
        else {
            swal('El correo electrónico no es correcto.');
        }
    }
}




/////////////////////////////////////////////////////////USER///////////////////////////////////////////////////////////////////////////////


function Add() {

    var user = {
        name: $('#name').val(),
        lastName: $('#lastName').val(),
        telephone: $('#phone').val(),
        address: $('#adress').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        roleId: $('#role').val()
    };

    var role = {

        id: $('#role').val(),
        name: 'Client'

    };

    user.role = role


    if (user != null) {


        $.ajax({
            url: "/User/Insert",
            data: JSON.stringify(user), //converte la variable estudiante en tipo json
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                // alert("resultado: "+result);
                $('#result').text("Usuario Añadido");
                //document.getElementById("result").style.color = "green";

                $('#result').css('color', 'green');
                $('#name').val('');
                $('#lastName').val('');
                $('#phone').val('');
                $('#adress').val('');
                $('#email').val('');
                $('#password').val('');
                $('#password2').val('');
                LoadUsers();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
                $('#result').text("Correo ya fue registrado");
                $('#result').css('color', 'red');
                $('#password').val('');
            }
        });

    }
    else
    {
        $('#error').show();
        
    }

   
}

function Add2() {

    var user = {
        name: $('#name2').val(),
        lastName: $('#lastName2').val(),
        telephone: $('#phone2').val(),
        address: $('#adress2').val(),
        email: $('#email2').val(),
        password: $('#password20').val(),
        roleId: $('#role2').val()
    };

    var role = {

        id: $('#role2').val(),
        name: 'Client'

    };

    user.role = role

    if (user != null) {

        $.ajax({
            url: "/User/Insert",
            data: JSON.stringify(user), //converte la variable estudiante en tipo json
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                // alert("resultado: "+result);
                $('#result').text("Usuario Añadido");
                //document.getElementById("result").style.color = "green";

                $('#result').css('color', 'green');
                $('#name2').val('');
                $('#lastName2').val('');
                $('#phone2').val('');
                $('#adress2').val('');
                $('#email2').val('');
                $('#password20').val('');
                $('#password22').val('');
                LoadUsers();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
                $('#result').text("Correo ya fue registrado");
                $('#result').css('color', 'red');
                $('#password2').val('');
            }
        });

    }


}

function Clear() {

    $('#name').val('');
    $('#lastName').val('');
    $('#phone').val('');
    $('#adress').val('');
    $('#email').val('');
    $('#password').val('');
    $('#password2').val('');

}

function Clear2() {

    $('#name2').val('');
    $('#lastName2').val('');
    $('#phone2').val('');
    $('#adress2').val('');
    $('#email2').val('');
    $('#password20').val('');
    $('#password22').val('');

}

function GetStudentByEmail(emailStudent) {

    var email = ""; 
    $.ajax({
        url: "/Home/GetByEmailUser",
        type: "GET",
        data: { email: emailStudent },
        success: function (result) {
            $('#id').val(result.id);
            $('#name').val(result.name);
            $('#email').val(result.email);
            $('#major').val(result.major.id);
        },
        error: function (errorMessage) {
            if (errorMessage === "no connection") {
                $('#result').text("Error en la conexión.");
            }
            $('#result').text("User not added");
            $('#result').css('color', 'red');
            $('#password').val('');
        }
    });
}


function GetUserByEmail(emailUser) {

    var email = "";
    $.ajax({
        url: "/User/GetByEmail",
        type: "GET",
        data: { email: emailUser },
        success: function (result) {


            
            $('#result_edit').val('');
            $('#id').val(result.id);
            $('#name_edit').val(result.name);
            $('#lastName_edit').val(result.lastName);
            $('#phone_edit').val(result.telephone);
            $('#adress_edit').val(result.address);
            $('#email_edit').val(result.email);
            $('#password_edit').val(result.password);
            
            
        },
        error: function (errorMessage) {
            if (errorMessage === "no connection") {
                $('#result').text("Error en la conexión.");
            }
        }
    });
}




function LoadUsers() {

    $.ajax({
        url: "/User/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var html = '';
            $.each(result, function (key, item) {

                html += '<tr>';
                
                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.lastName + '</td>';
                html += '<td>' + item.telephone + '</td>';
                html += '<td>' + item.address + '</td>';
                html += '<td>' + item.email + '</td>';
                html += '<td>' + item.role.name + '</td>';
                html += '<td><a href="" data-toggle="modal" id="btn_edit_user" data-target="#modalContactForm" onclick="GetUserByEmail(\'' + item.email + '\')">Editar Usuario</a> | <a href="#" onclick="Delete_User(' + item.id + ')">Eliminar</a></td>';
                html += '</tr>';
            });

            $('#students-tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}

function Update_User() {

    var user = {
        id: $('#id').val(),
        name: $('#name_edit').val(),
        lastName: $('#lastName_edit').val(),
        telephone: $('#phone_edit').val(),
        address: $('#adress_edit').val(),
        email: $('#email_edit').val(),
        password: $('#password_edit').val(),
        roleId: $('#role').val()


    };

    var role = {

        id: $('#role').val(),
        name: 'Cliente'

    };

    user.role = role

    if (user != null && validationsAbout()) {

        $.ajax({
            url: "/User/Update",
            data: JSON.stringify(user),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) { 
                $('#result_edit').text("Usuario actualizado");
                $('#result_edit').css('color', 'green');
                $('#name_edit').val('');
                $('#lastName_edit').val('');
                $('#phone_edit').val('');
                $('#adress_edit').val('');
                $('#email_edit').val('');
                $('#password_edit').val('');
                $('#password2_edit').val('');
                LoadUsers();             
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
                $('#result_edit').text("Usuario no añadido");
                $('#result_edit').css('color', 'red');
                $('#password').val('');
            }
        });

    }
}


function Delete_User(iduser) {


    var user = {
        id: iduser
    };

    if (user != null) {

        $.ajax({
            url: "/User/Delete",
            data: JSON.stringify(user),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                LoadUsers();
                
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
            }
             
        });
        LoadUsers();
    }
}

//////////////////////////////////////////////////// PARKING ////////////////////////////////////////////////////////////////////////////
//camiar nombre de etiquetas en layout//name_parking//id_parking // parking-entry-form //resul_parking

function Add_Parking() {

    var parking = {
        name: $('#name_Parking').val(),
        capacity: $('#capacity').val(),
        province: $('#province').val(),
        district: $('#district').val()
    };

    if (parking != null) {

        $.ajax({
            url: "/Parking/Insert",
            data: JSON.stringify(parking), //converte la variable estudiante en tipo json
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                // alert("resultado: "+result);
                $('#result_Parking').text("Parqueo añadido");
                //document.getElementById("result").style.color = "green";

                $('#result_Parking').css('color', 'green');
                $('#name_Parking').val('');
                $('#capacity').val('');
                $('#province').val('');
                $('#district').val('');
                LoadParking();
                Add_Space(result);

            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
                $('#result_Parking').text("No se pudo añadir el parqueo");
                $('#result_Parking').css('color', 'red');
                $('#password').val('');
            }
        });

    }


}


function Clear_Parking() {

    $('#name_Parking').val('');
    $('#capacity').val('');
    $('#province').val('');
    $('#district').val('');

}


function GetParkingById(IdParking) {

    var parking = {
        id: IdParking
    };

    if (parking != null) {

        $.ajax({
            url: "/Parking/GetById",
            data: JSON.stringify(parking),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#id_parking').val(result.id);
                $('#name_parking_edit').val(result.name);
                $('#capacity_edit').val(result.capacity);
                $('#province_edit').val(result.province);
                $('#district_edit').val(result.district);

            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
                $('#result_Parking').text("User not added");
                $('#result_Parking').css('color', 'red');
            }
        });
    }
}


function LoadParking() {

    $.ajax({
        url: "/Parking/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var html = '';
            $.each(result, function (key, item) {

                html += '<tr>';
                
                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.capacity + '</td>';
                html += '<td>' + item.province + '</td>';
                html += '<td>' + item.district + '</td>';             
                html += '<td><a href="#space" onclick="LoadSpaces(' + item.id + ')">Select</a> | <a href="" data-toggle="modal" id="btn_edit_user" data-target="#modalContactFormm" onclick="GetParkingById(\'' + item.id + '\')">Editar Parqueo</a> | <a href="#" onclick="Delete_Parking(' + item.id + ')">Eliminar</a></td>';
                html += '</tr>';
            });

            $('#parking-tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}

function LoadParking2() {

    $.ajax({
        url: "/Parking/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var html = '';
            $.each(result, function (key, item) {

                html += '<tr>';

                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.capacity + '</td>';
                html += '<td>' + item.province + '</td>';
                html += '<td>' + item.district + '</td>';
                html += '<td><a href="#space" onclick="LoadSpaces2(' + item.id + ')">Select</a>';
                html += '</tr>';
            });

            $('#parkingClient-tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}

function Update_Parking() {

    var parking = {
        id: $('#id_parking').val(),
        name: $('#name_parking_edit').val(),
        capacity: $('#capacity_edit').val(),
        province: $('#province_edit').val(),
        district: $('#district_edit').val()
    };

    if (parking != null) {

        $.ajax({
            url: "/Parking/Update",
            data: JSON.stringify(parking),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#result_Parking').text("Actualizado satisfactoriamente");
                $('#result_Parking').css('color', 'green');
                $('#name_parking_edit').val('');
                $('#capacity_edit').val('');
                $('#province_edit').val('');
                $('#district_edit').val('');
                LoadParking();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
                $('#result_Parking').text("El parqueo no pudo ser actualizado");
                $('#result_Parking').css('color', 'red');
                $('#password').val('');
            }
        });

    }
}

function Delete_Parking(idparking) {


    var parking = {
        id: idparking
    };

    if (parking != null) {

        $.ajax({
            url: "/Parking/Delete",
            data: JSON.stringify(parking),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result == 1) {
                    LoadParking();
                }
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_Parking').text("Error en la conexión.");
                }
            }
        });

    }
}

///////ROLE///////

function GetRoleByName(name_role) {

    var role = {
        name: name_role
    };

    if (role != null) {

        $.ajax({
            url: "/Role/GetByName",
            data: JSON.stringify(role),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#id_rol_edit').val(result.id);
                $('#name_role_edit').val(result.name);
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_role').text("Error en la conexión.");
                }
                $('#result_role').text("User not added");
                $('#result_role').css('color', 'red');
            }
        });
    }
}

function LoadRole() {

    $.ajax({
        url: "/Role/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.id + '</td>';
                html += '<td>' + item.name + '</td>';
                html += '<td><a href="" data-toggle="modal" id="btn_edit_user" data-target="#modalContactFormmmm" onclick="GetRoleByName(\'' + item.name + '\')">Editar Rol</a> | <a href="#" onclick="Delete_Role(' + item.id + ')">Eliminar</a></td>';
                html += '</tr>';
            });

            $('#Role-tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}

function Add_Role() {

    var role = {
        name: $('#name_rol').val(),
    };

    if (role != null) {

        $.ajax({
            url: "/Role/Insert",
            data: JSON.stringify(role),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#result_role').text("Agregado con éxito");
                $('#result_role').css('color', 'green');
                $('#name_rol').val('');
                LoadRole();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_role').text("Error en la conexión.");
                }
                $('#result_role').text("Rol no agregado");
                $('#result_role').css('color', 'red');
            }
        });
    }
}



function Clear_Role() {

    $('#name_Rol').val('');
    $('#name_role_edit').val('');
}


function Update_Role() {

    var role = {
        id: $('#id_rol_edit').val(),
        name: $('#name_role_edit').val(),
    };

    if (role != null) {

        $.ajax({
            url: "/Role/Update",
            data: JSON.stringify(role),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#result_role').text("Actualizado con éxito");
                $('#result_role').css('color', 'green');
                $('#name_rol_edit').val('');
                LoadRole();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_role').text("Error en la conexión.");
                }
                $('#result_role').text("Rol no agregado");
                $('#result_role').css('color', 'red');
            }
        });
    }
}

function Delete_Role(idRole) {

    var role = {
        id: idRole
    };

    if (role != null) {

        $.ajax({
            url: "/Role/Delete",
            data: JSON.stringify(role),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result == 1) {
                    LoadRole();
                }
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_role').text("Error en la conexión.");
                }
            }
        });

    }
}




//function Add_Role() {

//    var role = {
//        name: $('#name_role').val(),
        
//    };

//    if (role != null) {

//        $.ajax({
//            url: "/Role/Insert",
//            data: JSON.stringify(role),
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {
//                $('#name_role').val('');
//                LoadRole();
//            },
//            error: function (errorMessage) {
//                if (errorMessage === "no connection") {
//                    $('#result').text("Error en la conexión.");
//                }   
//            }
//        });
//    }
//}

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
                $('#result_vehicule').text("Vehiculo añadido");
                $('#result_vehicule').css('color', 'green');
                $('#license_Plate').val('');
                $('#color').val('');
                $('#brand').val('');
                $('#vehicule_Type').val($("#vehicule_Type option:first").val());
                LoadVehicules();
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

            $('#type_edit').append(html);

            $('#type_space').append(html);

            $('#Rate_Type').append(html);

            $('#ratetype_edit').append(html);

        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}


//function GetVehiculeByLicensePlate(vehiculeLicense_Plate) {

//    var license_Plate = "";
//    $.ajax({
//        url: "/Vehicule/GetByLicensePlate",
//        type: "GET",
//        data: { license_Plate: vehiculeLicense_Plate },
//        success: function (result) {
//            $('#id_vehicule_edit').val(result.id);
//            $('#plate_edit').val(result.license_Plate);
//            $('#color_edit').val(result.color);
//            $('#brand_edit').val(result.brand);
//            $('#type_edit').val(result.vehicule_Type.id);
//        },
//        error: function (errorMessage) {
//            if (errorMessage === "no connection") {
//                $('#result').text("Error en la conexión.");
//            }
//            $('#result_vehicule').text("Vehicule not added");
//            $('#result_vehicule').css('color', 'red');
//        }
//    });
//}

//function Update_Vehicule() {
//    var vehicule = {
//        id: $('#id_vehicule_edit').val(),
//        license_Plate: $('#plate_edit').val(),
//        color: $('#color_edit').val(),
//        brand: $('#brand_edit').val(),
//        id_User: $('#idUserSesion').val(),
//        id_Type: parseInt($('#type_edit').val())
//    };

//    var vehicule_type = {
//        id: $('#type_edit').val(),
//        name: $('#type_edit').find('option:selected').text()
//    };

//    var user_id = {
//        id: $('#idUserSesion').val(),

//    };

//    vehicule.user = user_id;
//    vehicule.vehicule_type = vehicule_type;

//    if (vehicule != null) {

//        $.ajax({
//            url: "/Vehicule/Update",
//            data: JSON.stringify(vehicule),
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {
//                $('#result_vehicule').text("Actializado");
//                $('#result_vehicule').css('color', 'green');
//                $('#plate_edit').val('');
//                $('#color_edit').val('');
//                $('#brand_edit').val('');
//                $('#type_edit').val($("#type_edit option:first").val());
//                LoadVehicules();
//            },
//            error: function (errorMessage) {
//                if (errorMessage === "no connection") {
//                    $('#result_vehicule').text("Error en la conexión.");
//                }
//                $('#result_vehicule').text("Vehicule not added");
//                $('#result_vehicule').css('color', 'red');
//            }
//        });
//    }
//}


//function Delete_Vehicule(idvehicule) {


//    var vehicule = {
//        id: idvehicule
//    };

//    if (vehicule != null) {

//        $.ajax({
//            url: "/Vehicule/Delete",
//            data: JSON.stringify(vehicule),
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {

//                if (result == 1) {
//                    LoadVehicules();
//                }
//            },
//            error: function (errorMessage) {
//                if (errorMessage === "no connection") {
//                    $('#result_vehicule').text("Error en la conexión.");
//                }
//            }
//        });
//    }
//}

//************************************************        SPACE          ***************************************************//
function Add_Space(parkingSpa) {

    var space = {
        number: 0,
        id_Type: 6,
        status: 'Disponible',
        id_Vehicule: 18,
        id_Parking: 0,
        check_In: '-',
        id_Rate: 13,
    }

    var vehicule = {
        id: 18
    }
    var type = {
        id: 6
    } 
    var rate = {
        idRate:13
    }

  
    space.rate = rate;
    space.type = type;
    space.vehicule = vehicule;
    space.parking = parkingSpa;

    if (space != null) {

        $.ajax({
            url: "/Space/Insert",
            data: JSON.stringify(space),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                LoadSpaces(idparking);
                $('#result_space').text("Añadido satisfactoriamente");
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_space').text("Error en la conexión.");
                }
                $('#result_space').text("Vehicule not added");
                $('#result_space').css('color', 'red');
            }
        });
    }
}


function LoadSpaces(idparking) {

    var parking = {
        id: idparking
    };

    if (space != null) {


        $.ajax({
            url: "/Space/Get",
            data: JSON.stringify(parking),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                var html = '';
                $.each(result, function (key, item) {

                    html += '<tr>';
                    
                    html += '<td>' + item.number + '</td>';
                    html += '<td>' + item.type.name + '</td>';
                    html += '<td>' + item.status + '</td>';
                    html += '<td>' + item.vehicule.license_Plate + '</td>';
                    html += '<td>' + item.parking.name + '</td>';
                    html += '<td>' + item.check_In + '</td>';
                    html += '<td>' + item.rate.idRate + '</td>';
                    html += '<td><a href="" data-toggle="modal" data-target="#modalContactFormmmmm" onclick="GetSpaceById(' + item.id + ')">Edit</a> | <a href="#space" onclick="Delete_Space(' + item.id + ')">Delete</a></td>';
                    html += '</tr>';
                });

                $('#space-tbody').html(html);
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }
}



function LoadSpaces2(idparking) {

    var parking = {
        id: idparking
    };

    var srate = "";
    srate = $('#rate_space').find('option:selected').text();

    if (space != null) {


        $.ajax({
            url: "/Space/Get",
            data: JSON.stringify(parking),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                var html = '';
                $.each(result, function (key, item) {

                    html += '<tr>';
                    html += '<td>' + item.number + '</td>';
                    html += '<td>' + item.type.name + '</td>';
                    html += '<td>' + item.status + '</td>';
                    html += '<td>' + item.vehicule.license_Plate + '</td>';
                    html += '<td>' + item.parking.name + '</td>';
                    html += '<td>' + item.check_In + '</td>';
                    if (srate == "Por Hora") {
                        html += '<td>' + item.rate.perHour + '</td>';
                    } else if (srate == "Por MediaHora") {
                        html += '<td>' + item.rate.perHalfHour + '</td>';
                    } else if (srate == "Por Día") {
                        html += '<td>' + item.rate.perDay + '</td>';
                    } else if (srate == "Por Semana") {
                        html += '<td>' + item.rate.perWeek + '</td>';
                    } else if (srate == "Por Mes") {
                        html += '<td>' + item.rate.perMonth + '</td>';
                    } else if (srate == "Por Año") {
                        html += '<td>' + item.rate.perYear + '</td>';
                    } else {
                        html += '<td>' + item.rate.idRate + '</td>';
                    }
                    html += '<td><a href="" data-toggle="modal" data-target="#modalContactFormmmmm" onclick="GetSpaceById(' + item.id + ')">Reservar</a> | <a href="#space" onclick="Update_Space2(' + item.id + ',' + idparking +')">Cancelar</a></td>';
                    html += '</tr>';
                });

                $('#spaceclient-tbody').html(html);
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }
}

function Clear_Space() {

    $('#type_space').val('');
    $('#status_space').val('');
    $('#check_In').val('');
    $('#rate_space').val('');
    $('#space_Vehicule').val($("#id_Vehicule option:first").val());
}


function GetVehicules() {

    $.ajax({
        url: "/Vehicule/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<option value="' + item.id + '">' + item.license_Plate + '</option>';
            });
            $('#space_Vehicule').append(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}


function GetSpaceById(idSpace) {

    var id = "";
    $.ajax({
        url: "/Space/GetById",
        type: "GET",
        data: { id: idSpace },
        success: function (result) {
            $('#id_space').val(result.id);
            $('#number_space').val(result.number);
            $('#parking_space').val(result.parking.id);
            $('#type_space').val(result.type);
            $('#status_space').val(result.status);
            $('#check_In').val(result.check_In);
            $('#rate_space').val(result.rate.idRate);
            $('#space_Vehicule').val(result.vehicule.id);
        },
        error: function (errorMessage) {
            if (errorMessage === "no connection") {
                $('#result_space').text("Error en la conexión.");
            }
            $('#result_space').text("Espacio no añadido");
            $('#result_space').css('color', 'red');
        }
    });
}

function Update_Space() {


    var selectrate = "";



    var space = {
        id: $('#id_space').val(),
        number: $('#number_space').val(),
        id_Type: $('#type_space').val(),
        status: $('#status_space').val(),
        id_Vehicule: parseInt($('#space_Vehicule').val()),
        id_Parking: $('#parking_space').val(),
        check_In: $('#check_In').val(),
        id_Rate: 13,
    }

    var rateid = 0
    var srate = "";
    srate= $('#rate_space').find('option:selected').text();

    if (space.id_Type == 5) {

        rateid = 12;
    } else if (space.id_Type == 6) {

        rateid = 13;
    } else {
        rateid = space.id_Type;
    }



    var parking = {
        id: $('#parking_space').val()
    }

    var vehicule = {
        id: $('#space_Vehicule').val(),
        license_Plate: $('#space_Vehicule').find('option:selected').text()
    }
    var type = {
        id: $('#type_space').val(),
        name: $('#type_space').find('option:selected').text()
    }
    var rate = {
        idRate: rateid
    }


    space.rate = rate;
    space.type = type;
    space.vehicule = vehicule;
    space.parking = parking;

    if (space != null) {

        $.ajax({
            url: "/Space/Update",
            data: JSON.stringify(space, srate),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                LoadSpaces(parking.id);
                LoadSpaces2(parking.id);
                $('#result_space').text("Actualizado satisfactoriamente");
                $('#result_space').css('color', 'green');
                $('#type_space').val('');
                $('#status_space').val('');
                $('#check_In').val('');
                $('#check_Out').val('');
                $('#space_Vehicule').val($("#id_Vehicule option:first").val());
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_space').text("Error en la conexión.");
                }
                $('#result_space').text("Vehicule not added");
                $('#result_space').css('color', 'red');
            }
        });
    }
}


function Update_Space2(idra,idpar) {

    var space = {
        id: idra,
        number: 0,
        id_Type: 6,
        status: 'Disponible',
        id_Vehicule: 18,
        id_Parking: 0,
        check_In: '-',
        id_Rate: 13,
    }

    var vehicule = {
        id: 18
    }
    var type = {
        id: 6
    }
    var rate = {
        idRate: 13
    }
    var parking = {
        id: idpar
    }


    space.rate = rate;
    space.type = type;
    space.vehicule = vehicule;
    space.parking = parking;

    if (space != null) {

        $.ajax({
            url: "/Space/Update",
            data: JSON.stringify(space),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                LoadSpaces2(idpar);
                LoadSpaces(idparking);
                $('#result_space').text("Añadido satisfactoriamente");
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_space').text("Error en la conexión.");
                }
                $('#result_space').text("Vehicule not added");
                $('#result_space').css('color', 'red');
            }
        });
    }
}


function Delete_Space(idSpace) {


    var space = {
        id: idSpace
    };

    if (space != null) {

        $.ajax({
            url: "/Space/Delete",
            data: JSON.stringify(space),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result == 1) {
                    LoadSpaces();
                }
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_space').text("Error en la conexión.");
                }
            }
        });
    }
}





function Add_Rate() {


    var rate = {
        vehiculeType: parseInt($('#Rate_Type').val()),
        perHour: $('#per_Hour').val(),
        perHalfHour: $('#per_HalfHour').val(),
        perDay: $('#per_Day').val(),
        perWeek: $('#per_Week').val(),
        perMonth: $('#per_Month').val(),
        perYear: $('#per_Year').val(),
    };


    var vehicule_type = {
        id: $('#Rate_Type').val(),
        name: $('#Rate_Type').find('option:selected').text()
    };


    rate.vehiculeType = vehicule_type

    if (rate != null) {
        $.ajax({
            url: "/Rate/Insert",
            data: JSON.stringify(rate),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#result_Rate').text("Añadido correctamente");
                $('#result_Rate').css('color', 'green');
                $('#per_Hour').val('');
                $('#per_HalfHour').val('');
                $('#per_Day').val('');
                $('#per_Week').val('');
                $('#per_Month').val('');
                $('#per_Year').val('');
                $('#Rate_Type').val($("#Rate_Type option:first").val());
                LoadRate();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_Rate').text("Error en la conexión.");
                }
                $('#result_Rate').text("Tarifa no añadida");
                $('#result_Rate').css('color', 'red');
            }
        });
    }
}


function Clear_Rate() {

    $('#per_Hour').val('');
    $('#per_HalfHour').val('');
    $('#per_Day').val('');
    $('#per_Week').val('');
    $('#per_Month').val('');
    $('#per_Year').val('');
    $('#Rate_Type').val($("#Rate_Type option:first").val());
}


function LoadRate() {

    $.ajax({
        url: "/Rate/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.vehiculeType.name + '</td>';
                html += '<td>' + item.perHour + '</td>';
                html += '<td>' + item.perHalfHour + '</td>';
                html += '<td>' + item.perDay + '</td>';
                html += '<td>' + item.perWeek + '</td>';
                html += '<td>' + item.perMonth + '</td>';
                html += '<td>' + item.perYear + '</td>';
                html += '<td><a href="" data-toggle="modal" id="btn_edit_user" data-target="#modalContactFormmm" onclick="GetRateById(' + item.idRate + ')">Editar Tarifa</a> | <a href="#" onclick="Delete_Rate(' + item.idRate + ')">Eliminar</a></td>';

                html += '</tr>';
            });

            $('#Rate-tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function LoadRate2() {

    $.ajax({
        url: "/Rate/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.vehiculeType.name + '</td>';
                html += '<td>' + item.perHour + '</td>';
                html += '<td>' + item.perHalfHour + '</td>';
                html += '<td>' + item.perDay + '</td>';
                html += '<td>' + item.perWeek + '</td>';
                html += '<td>' + item.perMonth + '</td>';
                html += '<td>' + item.perYear + '</td>';
                html += '</tr>';
            });

            $('#Rate-tbody2').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}


function GetRateById(idRate) {

    var id = "";
    $.ajax({
        url: "/Rate/GetById",
        type: "GET",
        data: { id: idRate },
        success: function (result) {
            $('#id_rate_edit').val(result.idRate);
            $('#ratetype_edit').val(result.vehiculeType.id);
            $('#Per_Hour_edit').val(result.perHour);
            $('#Per_HalfHour_edit').val(result.perHalfHour);
            $('#Per_Day_edit').val(result.perDay);
            $('#Per_Week_edit').val(result.perWeek);
            $('#Per_Month_edit').val(result.perMonth);
            $('#Per_Year_edit').val(result.perYear);
        },
        error: function (errorMessage) {
            if (errorMessage === "no connection") {
                $('#result_Rate_edit').text("Error en la conexión.");
            }
            $('#result_Rate_edit').text("Tarifa no actualizada");
            $('#result_Rate_edit').css('color', 'red');
        }
    });
}

function Update_Rate() {

    var rate = {
        idRate: $('#id_rate_edit').val(),
        vehiculeType: parseInt($('#ratetype_edit').val()),
        perHour: $('#Per_Hour_edit').val(),
        perHalfHour: $('#Per_HalfHour_edit').val(),
        perDay: $('#Per_Day_edit').val(),
        perWeek: $('#Per_Week_edit').val(),
        perMonth: $('#Per_Month_edit').val(),
        perYear: $('#Per_Year_edit').val(),

    };

    var vehicule_type = {
        id: $('#ratetype_edit').val(),
        name: $('#ratetype_edit').find('option:selected').text()
    };


    rate.vehiculeType = vehicule_type

    if (rate != null) {
        $.ajax({
            url: "/Rate/Update",
            data: JSON.stringify(rate),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#result_Rate_edit').text("Actualizado correctamente");
                $('#result_Rate_edit').css('color', 'green');
                $('#Per_Hour_edit').val('');
                $('#Per_HalfHour_edit').val();
                $('#Per_Day_edit').val();
                $('#Per_Week_edit').val();
                $('#Per_Month_edit').val();
                $('#Per_Year_edit').val();
                $('#ratetype_edit').val($("#ratetype_edit option:first").val());
                LoadRate();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_Rate').text("Error en la conexión.");
                }
                $('#result_Rate_edit').text("Tarifa no actualizada");
                $('#result_Rate_edit').css('color', 'red');
            }
        });
    }
}

function Delete_Rate(idrate) {


    var rate = {
        id: idrate
    };

    if (rate != null) {

        $.ajax({
            url: "/Rate/Delete",
            data: JSON.stringify(idrate),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {

                if (result == 1) {
                    LoadRate();
                }
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result_Rate').text("Error en la conexión.");
                }
            }
        });
    }
}