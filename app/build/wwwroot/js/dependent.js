// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {
    LoadDependent();

    $(document).on('submit', '#depent-entry-form', function () {

        if ($('#idDependent').val() == 0) {

            AddDependent();
        } else {

            UpdateDependent();
        }
        return false;
    });



});



function AddDependent() {

    var user = {
        name: $('#nameDependent').val(),
        lastName: $('#lastNameDependent').val(),
        telephone: $('#phoneDependent').val(),
        address: $('#adressDependent').val(),
        email: $('#emailDependent').val(),
        password: $('#passwordDependent').val(),
        roleId: $('#roleDependent').val()
    };

    var role = {

        id: $('#roleDependent').val(),
        name: 'Dependiente'

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

                $('#result').text("Añadido satisfactoriamente");

                $('#result').css('color', 'green');
                $('#nameDependent').val('');
                $('#lastNameDependent').val('');
                $('#phoneDependent').val('');
                $('#adressDependent').val('');
                $('#emailDependent').val('');
                $('#passwordDependent').val('');
                $('#password2Dependent').val('');
                LoadDependent();

            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#resultDependent').text("Error en la conexión.");
                }
                $('#resultDependent').text("Dependiente no fue agregado");
                $('#resultDependent').css('color', 'red');
                $('#passwordDependent').val('');
            }
        });

    }


}


function LoadDependent() {

    $.ajax({
        url: "/User/GetDependent",
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
                html += '<td><a href="" data-toggle="modal" id="btn_edit_user" data-target="#dependentModal" onclick="GetDependentByEmail(\'' + item.email + '\')">Editar</a> | <a href="#" onclick="Delete(' + item.id + ')">Eliminar</a></td>';
                html += '</tr>';
            });

            $('#dependet-tbody').html(html);
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });

}


function GetDependentByEmail(emailUser) {

    var email = "";
    $.ajax({
        url: "/User/GetByEmail",
        type: "GET",
        data: { email: emailUser },
        success: function (result) {



            $('#resultD_edit').val('');
            $('#idDependent').val(result.id);
            $('#nameD_edit').val(result.name);
            $('#lastNameD_edit').val(result.lastName);
            $('#phoneD_edit').val(result.telephone);
            $('#adressD_edit').val(result.address);
            $('#emailD_edit').val(result.email);
            $('#passwordD_edit').val(result.password);
             


        },
        error: function (errorMessage) {
            if (errorMessage === "no connection") {
                $('#resultD_edit').text("Error en la conexión.");
            }
        }
    });
}


function UpdateDependent() {

    var user = {
        id: $('#idDependent').val(),
        name: $('#nameD_edit').val(),
        lastName: $('#lastNameD_edit').val(),
        telephone: $('#phoneD_edit').val(),
        address: $('#adressD_edit').val(),
        email: $('#emailD_edit').val(),
        password: $('#passwordD_edit').val(),
        roleId: $('#roleDependent').val()


    };

    var role = {

        id: $('#roleDependent').val(),
        name: 'Dependiente'

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
                $('#resultD_edit').text("Actualizado");
                $('#resultD_edit').css('color', 'green');
                $('#nameD_edit').val('');
                $('#lastNameD_edit').val('');
                $('#phoneD_edit').val('');
                $('#adressD_edit').val('');
                $('#emailD_edit').val('');
                $('#passwordD_edit').val('');
                LoadDependent();
            },
            error: function (errorMessage) {
                if (errorMessage === "no connection") {
                    $('#result').text("Error en la conexión.");
                }
                $('#result_edit').text("No se pudo actualizar");
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
                    LoadDependent();
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
