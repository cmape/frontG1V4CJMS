//GET, POST , PUT Y DELETE

function getReservaciones(){
    $.ajax({
        url:"http://localhost:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    });

}

function postReservaciones(){
    let cajas = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        car:{idCar: +$("#select-car").val()},
        client:{idClient: +$("#select-client").val()},
    };
    console.log(cajas);
    
    $.ajax({
        url:"http://localhost:8080/api/Reservation/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el mensaje");
            window.location.reload();
        }
    });

}

function putReservaciones(idBotonActualizar){
    if ($("#startDate").val().length==0 || $("#devolutionDate").val().length==0 || $("#status").val().length==0 || $("#select-car").val().length==0 || $("#select-client").val().length==0){
        alert("Todos los campos son obligatorios para actualizar los datos");
   
    }else{
        let cajas = {
            idReservation:idBotonActualizar,
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            car:{idCar: +$("#select-car").val()},
            client:{idClient: +$("#select-client").val()},
        };

        $.ajax({
            url:"http://localhost:8080/api/Reservation/update",
            type:"PUT",
            datatype:"JSON",
            contentType: "application/json",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se actualizo correctamente la Reservación");
                window.location.reload();
            }
        });
    }
}
function deleteReservaciones(idBoton){
    Swal.fire({
        title: 'Esta seguro de borrar la Reservación? con el id:'+idBoton,
        text: "si estas seguro se borrara definitivamente",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Borrado!',
            'Your file has been deleted.',
            'success'
            
          )
          let myData={
            id:idBoton
        };
        $.ajax({
            url:"http://localhost:8080/api/Reservation/"+idBoton,
            type:"DELETE",
            datatype:"JSON",
            data:JSON.stringify(myData),
            contentType: "application/json",
            success:function(respuesta){
                alert("se ha borrado correctamente la Reservación")
                window.location.reload();
            }
        });
        }
    })
    
}

/////////////////////////////////////

function getReservaciones_Car(){
    $.ajax({
        url:"http://localhost:8080/api/Car/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select =$("#select-car");
            $.each(respuesta, function (id,name) {
                $select.append('<option value='+name.idCar+'>'+name.name+'</option>');
                //console.log(name);
            });
        }
    });
}

function getReservaciones_Client(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            let $select =$("#select-client");
            $.each(respuesta, function (id,name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                //console.log(name);
            });
        }
    });
}

////////////////////////////////////////
function pintarRespuesta(items){
    let myTable="<table class='table-auto w-full text-left whitespace-no-wrap'>";
        myTable+="<tr>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Fecha Inicio</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Fecha Devolución</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Estad Reservación</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Nombre Carro</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Categoria Carro</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Nombre Cliente</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Correo Cliente</td>";
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'></th>"
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'></th>"
        myTable+="</tr>";
    for(i=0;i<items.length;i++){
        initDate = items[i].startDate
        myTable+="<tr>";
        myTable+="<td class='px-4 py-3'>"+new Date(items[i].startDate).toISOString().split("T")[0]+"</td>";
        myTable+="<td class='px-4 py-3'>"+new Date(items[i].devolutionDate).toISOString().split("T")[0]+"</td>";
        myTable+="<td class='px-4 py-3'>"+items[i].status+"</td>";
        myTable+="<td class='px-4 py-3'>"+items[i].car.name+"</td>";
        myTable+="<td class='px-4 py-3'>"+items[i].car.brand+"</td>";
        myTable+="<td class='px-4 py-3'>"+items[i].client.name+"</td>";
        myTable+="<td class='px-4 py-3'>"+items[i].client.email+"</td>";
        myTable+="<td class='px-4 py-3' > <button onclick='putReservaciones("+items[i].idReservation+")' class='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'> Actualizar </button> " ;
        myTable+="<td class='px-4 py-3' > <button onclick='deleteReservaciones("+items[i].idReservation+")' class='bg-gray-900 text-white px-8 py-2 rounded-md text-lg font-medium'> Borrar </button> " ;
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").append(myTable);
}