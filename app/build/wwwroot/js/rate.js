//$(document).ready(function () {

//    LoadRate();
//    LoadRate2();

//    $(document).on('submit', '#rate-entry-form', function () {

//        if ($('#id_rate').val() == 0) {

//            Add_Rate();
//        } else {

//            Update_Rate();
//        }
//        return false;
//    });
//});


//function Add_Rate() {

//    var rate = {
//        vehiculeType: parseInt($('#Rate_Type').val()),
//        perHour: $('#per_Hour').val(),
//        perHalfHour: $('#per_HalfHour').val(),
//        perDay: $('#per_Day').val(),
//        perWeek: $('#per_Week').val(),
//        perMonth: $('#per_Month').val(),
//        perYear: $('#per_Year').val(),
//    };

//    var vehicule_type = {
//        id: $('#Rate_Type').val(),
//        name: $('#Rate_Type').find('option:selected').text()
//    };


//    rate.vehicule_type = vehicule_type

//    if (rate != null) {
//        $.ajax({
//            url: "/Rate/Insert",
//            data: JSON.stringify(rate),
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {
//                $('#result_Rate').text("Añadido correctamente");
//                $('#result_Rate').css('color', 'green');
//                $('#per_Hour').val('');
//                $('#per_HalfHour').val('');
//                $('#per_Day').val('');
//                $('#per_Week').val('');
//                $('#per_Month').val('');
//                $('#per_Year').val('');
//                $('#Rate_Type').val($("#Rate_Type option:first").val());
//                LoadRate();
//            },
//            error: function (errorMessage) {
//                if (errorMessage === "no connection") {
//                    $('#result_Rate').text("Error en la conexión.");
//                }
//                $('#result_Rate').text("Tarifa no añadida");
//                $('#result_Rate').css('color', 'red');
//            }
//        });
//    }
//}


//function Clear_Rate() {

//    $('#per_Hour').val('');
//    $('#per_HalfHour').val('');
//    $('#per_Day').val('');
//    $('#per_Week').val('');
//    $('#per_Month').val('');
//    $('#per_Year').val('');
//    $('#Rate_Type').val($("#Rate_Type option:first").val());
//}


//function LoadRate() {

//    $.ajax({
//        url: "/Rate/Get",
//        type: "GET",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {

//            var html = '';
//            $.each(result, function (key, item) {
//                html += '<tr>';
//                html += '<td>' + item.vehiculeType.name + '</td>';
//                html += '<td>' + item.perHour + '</td>';
//                html += '<td>' + item.perHalfHour + '</td>';
//                html += '<td>' + item.perDay + '</td>';
//                html += '<td>' + item.perWeek + '</td>';
//                html += '<td>' + item.perMonth + '</td>';
//                html += '<td>' + item.perYear + '</td>';
//                html += '<td><a href="" data-toggle="modal" id="btn_edit_user" data-target="#modalContactFormmm" onclick="GetRateById(' + item.idRate + ')">Editar Tarifa</a> | <a href="#" onclick="Delete_Rate(' + item.id + ')">Eliminar</a></td>';
                 
//                html += '</tr>';
//            });

//            $('#Rate-tbody').html(html);
//        },
//        error: function (errorMessage) {
//            alert(errorMessage.responseText);
//        }
//    });
//}


//function LoadRate2() {

//    $.ajax({
//        url: "/Rate/Get",
//        type: "GET",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {

//            var html = '';
//            $.each(result, function (key, item) {
//                html += '<tr>';
//                html += '<td>' + item.vehiculeType.name + '</td>';
//                html += '<td>' + item.perHour + '</td>';
//                html += '<td>' + item.perHalfHour + '</td>';
//                html += '<td>' + item.perDay + '</td>';
//                html += '<td>' + item.perWeek + '</td>';
//                html += '<td>' + item.perMonth + '</td>';
//                html += '<td>' + item.perYear + '</td>';
//                html += '</tr>';
//            });

//            $('#Rate-tbody2').html(html);
//        },
//        error: function (errorMessage) {
//            alert(errorMessage.responseText);
//        }
//    });
//}

//function GetRateById(idRate) {

//    var id = "";
//    $.ajax({
//        url: "/Rate/GetById",
//        type: "GET",
//        data: { id: idRate },
//        success: function (result) {
//            $('#id_rate').val(result.id);
//            $('#ratetype_edit').val(result.vehiculeType.id);
//            $('#Per_Hour_edit').val(result.perHour);
//            $('#Per_HalfHour_edit').val(result.perHalfHour);
//            $('#Per_Day_edit').val(result.perDay);
//            $('#Per_Week_edit').val(result.perWeek);
//            $('#Per_Month_edit').val(result.perMonth);
//            $('#Per_Year_edit').val(result.perYear);
//        },
//        error: function (errorMessage) {
//            if (errorMessage === "no connection") {
//                $('#result_Rate_edit').text("Error en la conexión.");
//            }
//            $('#result_Rate_edit').text("Tarifa no actualizada");
//            $('#result_Rate_edit').css('color', 'red');
//        }
//    });
//}

//function Update_Rate() {

//    var rate = {
//        id: $('#id_rate').val(),
//        vehiculeType: parseInt($('#ratetype_edit').val()),
//        perHour: $('#Per_Hour_edit').val(),
//        perHalfHour: $('#Per_HalfHour_edit').val(),
//        perDay: $('#Per_Day_edit').val(),
//        perWeek: $('#Per_Week_edit').val(),
//        perMonth: $('#Per_Month_edit').val(),
//        perYear:$('#Per_Year_edit').val(),

//    };

//    var vehicule_type = {
//        id: $('#ratetype_edit').val(),
//        name: $('#ratetype_edit').find('option:selected').text()
//    };


//    rate.vehicule_type = vehicule_type;

//    if (rate != null) {
//        $.ajax({
//            url: "/Rate/Update",
//            data: JSON.stringify(rate),
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {
//                $('#result_Rate_edit').text("Actualizado correctamente");
//                $('#result_Rate_edit').css('color', 'green');
//                $('#Per_Hour_edit').val('');
//                $('#Per_HalfHour_edit').val();
//                $('#Per_Day_edit').val();
//                $('#Per_Week_edit').val();
//                $('#Per_Month_edit').val();
//                $('#Per_Year_edit').val();
//                $('#ratetype_edit').val($("#ratetype_edit option:first").val());
//                LoadRate();
//            },
//            error: function (errorMessage) {
//                if (errorMessage === "no connection") {
//                    $('#result_Rate').text("Error en la conexión.");
//                }
//                $('#result_Rate_edit').text("Tarifa no actualizada");
//                $('#result_Rate_edit').css('color', 'red');
//            }
//        });
//    }
//}

//function Delete_Rate(idrate) {


//    var rate = {
//        id: idrate
//    };

//    if (rate != null) {

//        $.ajax({
//            url: "/Rate/Delete",
//            data: JSON.stringify(rate),
//            type: "POST",
//            contentType: "application/json;charset=utf-8",
//            dataType: "json",
//            success: function (result) {

//                if (result == 1) {
//                    LoadRate();
//                }
//            },
//            error: function (errorMessage) {
//                if (errorMessage === "no connection") {
//                    $('#result_Rate').text("Error en la conexión.");
//                }
//            }
//        });
//    }
//}