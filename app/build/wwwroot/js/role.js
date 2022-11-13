$(document).ready(function () {


});

//function Add_Role() {

//    var role = {
//        name: $('#name_rol').val(),
//    };

//    if (role != null) {

//        $.ajax({
//            url: "/Role/Insert",
//            data: JSON.stringify(role),
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {
//                $('#result_role').text("Agregado con éxito");
//                $('#result_role').css('color', 'green');
//                $('#name_rol').val('');
//                LoadRole();
//            },
//            error: function (errorMessage) {
//                if (errorMessage === "no connection") {
//                    $('#result_role').text("Error en la conexión.");
//                }
//                $('#result_role').text("Rol no agregado");
//                $('#result_role').css('color', 'red');
//            }
//        });
//    }
//}


//function Clear_Role() {

//    $('#name_Rol').val('');
//    $('#name_role_edit').val('');
//}


//function Update_Role() {

//    var role = {
//        id: $('id_rol_edit').val(),
//        name: $('#name_rol_edit').val()
//    };

//    if (role != null) {

//        $.ajax({
//            url: "/Role/Update",
//            data: JSON.stringify(role),
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {
//                $('#result_role').text("Actualizado con éxito");
//                $('#result_role').css('color', 'green');
//                $('#name_rol_edit').val('');
//                LoadRole();
//            },
//            error: function (errorMessage) {
//                if (errorMessage === "no connection") {
//                    $('#result_role').text("Error en la conexión.");
//                }
//                $('#result_role').text("Rol no agregado");
//                $('#result_role').css('color', 'red');
//            }
//        });
//    }
//}

//function Delete_Role(idRole) {

//    var role = {
//        id: idRole
//    };

//    if (role != null) {

//        $.ajax({
//            url: "/Role/Delete",
//            data: JSON.stringify(role),
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {

//                if (result == 1) {
//                    LoadRole();
//                }
//            },
//            error: function (errorMessage) {
//                if (errorMessage === "no connection") {
//                    $('#result_role').text("Error en la conexión.");
//                }
//            }
//        });

//    }
//}


