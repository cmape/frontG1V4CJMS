//GET, POST , PUT Y DELETE

function getClientes(){
    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            //console.log(respuesta);
            pintarRespuesta(respuesta);
        }

    });

}

function postClientes(){
    let cajas = {
        email:$("#email").val(),
        password:$("#password").val(),
        name:$("#name").val(),
        age:$("#age").val()
    };
    
    $.ajax({
        url:"http://localhost:8080/api/Client/save",
        type:"POST",
        datatype:"JSON",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente el cliente");
            window.location.reload();
        }
    });

}

function putClientes(idBotonActualizar){
    if ($("#email").val().length==0 || $("#password").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0 ){
        alert("Todos los campos son obligatorios para actualizar los datos");
    }else{
        let cajas = {
            idClient:idBotonActualizar,
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
            age:$("#age").val()
        };

        $.ajax({
            url:"http://localhost:8080/api/Client/update",
            type:"PUT",
            datatype:"JSON",
            contentType: "application/json",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se actualizo correctamente el cliente");
                window.location.reload();
            }
        });
    }
}

function deleteClientes(idBoton){
    let myData={
        id:idBoton
    };
    $.ajax({
        url:"http://localhost:8080/api/Client/"+idBoton,
        type:"DELETE",
        datatype:"JSON",
        data:JSON.stringify(myData),
        contentType: "application/json",
        success:function(respuesta){
            alert("se ha borrado correctamente el cliente")
            window.location.reload();
        }
    });
}


////////////////////////////////////////
function pintarRespuesta(items){
    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl'>Email</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Password</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Nombre</td>";
        myTable+="<td class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>Edad</td>";
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'></th>"
        myTable+="<th class='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'></th>"
        myTable+="</tr>";
    for(i=0;i<items.length;i++){
        myTable+="<tr>";
        myTable+="<td class='px-4 py-3'>"+items[i].email+"</td>";
        myTable+="<td class='px-4 py-3'>"+items[i].password+"</td>";
        myTable+="<td class='px-4 py-3'>"+items[i].name+"</td>";
        myTable+="<td class='px-4 py-3'>"+items[i].age+"</td>";
        myTable+="<td class='px-4 py-3' > <button onclick='putClientes("+items[i].idClient+")' class='text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'> Actualizar </button> " ;
        myTable+="<td class='px-4 py-3' > <button onclick='deleteClientes("+items[i].idClient+")' class='bg-gray-900 text-white px-8 py-2 rounded-md text-lg font-medium'> Borrar </button> " ;
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").append(myTable);
}