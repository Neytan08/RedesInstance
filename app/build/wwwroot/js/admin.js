// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {
    LoadAdmin();

    $(document).on('submit', '#admin-entry-form', function () {

        if ($('#idAdmin').val() == 0) {

            AddAdmin();
        } else {

            UpdateAdmin();
        }
        return false;
    });



});



function AddAdmin() {

    var user = {
        name: $('#nameAdmin').val(),
        lastName: $('#lastNameAdmin').val(),
        telephone: $('#phoneAdmin').val(),
        address: $('#adressAdmin').val(),
        email: $('#emailAdmin').val(),
        password: $('#passwordAdmin').val(),
        roleId: $('#roleAdmin').val()
    };

    var role = {

        id: $('#roleAdmin').val(),
        name: 'Administrador'

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

                $('#result').text("Administrador añadido");

                $('#result').css('color', 'green');
                $('#nameAdmin').val('');
                $('#lastNameAdmin').val('');
                $('#phoneAdmin').val('');
                $('#adressAdmin').val('');
                $('#emailAdmin').val('');
                $('#passwordAdmin').val('');
                $('#password2Admin').val('');
                LoadAdmin();

            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
                $('#resultAdmin').text("Administrador no fue agregado");
                $('#resultAdmin').css('color', 'red');
                $('#passwordAdmin').val('');
            }
        });

    }


}


function LoadAdmin() {

    $.ajax({
        url: "/User/GetAdmin",
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
                html += '<td><a href="" data-toggle="modal" id="btn_edit_user" data-target="#adminModal" onclick="GetAdminByEmail(\'' + item.email + '\')">Editar</a> | <a href="#" onclick="Delete(' + item.id + ')">Eliminar</a></td>';
                html += '</tr>';
            });

            $('#admin-tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}


function GetAdminByEmail(emailUser) {

    var email = "";
    $.ajax({
        url: "/User/GetByEmail",
        type: "GET",
        data: { email: emailUser },
        success: function (result) {



            $('#resultAdmin_edit').val('');
            $('#idAdmin').val(result.id);
            $('#nameAdmin_edit').val(result.name);
            $('#lastNameAdmin_edit').val(result.lastName);
            $('#phoneAdmin_edit').val(result.telephone);
            $('#adressAdmin_edit').val(result.address);
            $('#emailAdmin_edit').val(result.email);
            $('#passwordAdmin_edit').val(result.password);


        },
        error: function (errorMessage) {
            if (errorMessage === "no connection") {
                $('#resultAdmin_edit').text("Error en la conexión.");
            }
        }
    });
}


function UpdateAdmin() { 

    var user = {
        id: $('#idAdmin').val(),
        name: $('#nameAdmin_edit').val(),
        lastName: $('#lastNameAdmin_edit').val(),
        telephone: $('#phoneAdmin_edit').val(),
        address: $('#adressAdmin_edit').val(),
        email: $('#emailAdmin_edit').val(),
        password: $('#passwordAdmin_edit').val(),
        roleId: $('#roleAdmin').val()


    };

    var role = {

        id: $('#roleAdmin').val(),
        name: 'Administrador'

    };

    user.role = role

    if (user != null) {

        $.ajax({
            url: "/User/Update",
            data: JSON.stringify(user),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#resultAdmin_edit').text("Actualizado Satisfactoriamente");
                $('#resultAdmin_edit').css('color', 'green');
                $('#nameAdmin_edit').val('');
                $('#lastNameAdmin_edit').val('');
                $('#phoneAdmin_edit').val('');
                $('#adressAdmin_edit').val('');
                $('#emailAdmin_edit').val('');
                $('#passwordAdmin_edit').val('');
                LoadAdmin();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
                $('#result_edit').text("Administrador no agregado");
                $('#result_edit').css('color', 'red');
                $('#password').val('');
            }
        });

    }
}


function Delete(iduser) {


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

                if (result == 1) {
                    LoadAdmin();
                }
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
            }
        });

    }
}