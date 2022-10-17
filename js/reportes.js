function traerReporteStatus(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#status").remove();
            pintarRespuestaStatus(respuesta);
        }
    });
}

function traerReporteClientes(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#clients").remove();
            pintarRespuestaReporteClientes(respuesta);
        }
    });
}


function trearReporteFechas(){
    if ($("#startDate").val().length==0 || $("#endDate").val().length==0){
        alert("Todos los campos son obligatorios para actualizar los datos");
   
    }else{
        $.ajax({
            url:"http://localhost:8080/api/Reservation/report-dates/"+$("#startDate").val()+"/"+$("#endDate").val(),
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                $("#dates").remove();
                pintarRespuestaReporteFechas(respuesta);
            }
        });
    }
}


////////////////////////////////////////
function pintarRespuestaStatus(items){
    console.log(items);
    let myTable="<table id='status' name='status' class='table-auto w-full text-left whitespace-no-wrap'>";
        myTable+="<tr>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Completado</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Cancelado</td>";
        myTable+="</tr>";
        myTable+="<tr>";
        myTable+="<td class='px-4 py-3'>"+items.completed+"</td>";
        myTable+="<td class='px-4 py-3'>"+items.cancelled+"</td>";
        myTable+="</tr>";

    myTable+="</table>";
    $("#resultado1").append(myTable);
}

////////////////////////////////////////
function pintarRespuestaReporteClientes(items){
    let myTable="<table id='clients' name='clients' class='table-auto w-full text-left whitespace-no-wrap'>";
        myTable+="<tr>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Nombre Cliente</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Correo Cliente</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Edad Cliente</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Mensaje</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Nombre Carro</td>";
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Marca Carro</th>"
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Año Carro</th>"
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Descripción Carro</th>"
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Gama</th>"
        myTable+="</tr>";

    for(i=0; i<items.length; i++){
        for(c=0; c < items[i].client.messages.length; c++){
            myTable+="<tr>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.name+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.email+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.age+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.messages[c].messageText+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.messages[c].car.name+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.messages[c].car.brand+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.messages[c].car.year+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.messages[c].car.description+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.messages[c].car.gama.name+"</td>";
            myTable+="</tr>";
        }
    }
    myTable+="</table>";
    $("#resultado3").append(myTable);
}

////////////////////////////////////////
function pintarRespuestaReporteFechas(items){
    let myTable="<table id='dates' name='dates' class='table-auto w-full text-left whitespace-no-wrap'>";
        myTable+="<tr>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Nombre Cliente</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Correo Cliente</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Edad Cliente</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Fecha de Inicio</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Fecha de devolución</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Estatus</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Nombre Carro</td>";
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Marca Carro</th>"
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Año Carro</th>"
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Descripción Carro</th>"
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Gama</th>"
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Mensaje</td>";
        myTable+="</tr>";

    for(i=0; i<items.length; i++){
        for(c=0; c < items[i].car.messages.length; c++){
            myTable+="<tr>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.name+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.email+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].client.age+"</td>";
            myTable+="<td class='px-4 py-3'>"+new Date(items[i].startDate).toISOString().split("T")[0]+"</td>";
            myTable+="<td class='px-4 py-3'>"+new Date(items[i].devolutionDate).toISOString().split("T")[0]+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].status+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].car.name+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].car.brand+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].car.year+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].car.description+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].car.gama.name+"</td>";
            myTable+="<td class='px-4 py-3'>"+items[i].car.messages[c].messageText+"</td>";
            myTable+="</tr>";
        }
    }
    myTable+="</table>";
    $("#resultado2").append(myTable);
}