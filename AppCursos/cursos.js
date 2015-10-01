var url = "https://alumnoscurso.azure-mobile.net/Tables/Curso";
var modificando = undefined;

function muestraDatos() {
    var ajax = new XMLHttpRequest();
    var cursos = [];
   
    modificando = undefined;

    ajax.open("get", url, true);
    ajax.onreadystatechange = function () {
        if (ajax.readyState == ajax.DONE) {
            if (ajax.status >= 200 && ajax.status < 300) {
                cursos = JSON.parse(ajax.responseText);
                crearTabla(cursos);
                
            }
            else
                alert("Error al mostrar.");
        }
    };

    ajax.send(null);

}

function guardaDatos() {
    var ajax = new XMLHttpRequest();
    var curso = obtenerObjeto();
    
    ajax.open("post", url, true);
    ajax.setRequestHeader("Content-Type", "application/json");

    ajax.onreadystatechange = function () {
        if (ajax.readyState == ajax.DONE) {
            if (ajax.status >= 200 && ajax.status < 300)
                muestraDatos();
            else
                alert("Error en inserción.");
        }

    };
    
    ajax.send(JSON.stringify(curso));
}

function borrame(e) {
    var ajax = new XMLHttpRequest();
    var id = e.target.id.split(":")[1];

    ajax.open("delete", url+"/"+id);

    ajax.onreadystatechange = function () {
        if (ajax.readyState == ajax.DONE) {
            if (ajax.status >= 200 && ajax.status < 300)
                muestraDatos();
            else
                alert("Error en borrado.");
        }
    }

    ajax.send(null);

}

function cargaModificacion(id) {
    var ajax = new XMLHttpRequest();
    ajax.open("get", url+"/"+id, true);

    ajax.onreadystatechange = function () {
        if (ajax.readyState == ajax.DONE) {
            if (ajax.status >= 200 && ajax.status < 300) {
                var data = JSON.parse(ajax.responseText);
                document.getElementById("txtNombre").value = data.nombre;
                document.getElementById("txtDuracion").value = data.duracion;
                modificando = data.id;
            }
            else
                alert("Error al mostrar.");
        }
    };

    ajax.send(null);
}

function ejecutaModificacion() {
    var ajax = new XMLHttpRequest();
    var data = obtenerObjeto();

    ajax.open("PATCH", url+"/"+modificando, true);
    ajax.setRequestHeader("Content-Type", "application/json");

    ajax.onreadystatechange = function () {
        if (ajax.readyState == ajax.DONE) {
            if (ajax.status >= 200 && ajax.status < 300)
                muestraDatos();
            else
                alert("Error en modificación.");
        }

    };

    data.id = modificando;
    ajax.send(JSON.stringify(data));
}

function crearTabla(array) {
    var aBorrar;
    var divSalida = document.getElementById("lista");
    var tabla = "<table><tr><th>Nombre</th><th>Duración</th></tr>";

    for (var i = 0; i < array.length; i++) {
        tabla += "<tr><td>" + array[i].nombre + "</td><td>" + array[i].duracion + "</td>";
        tabla += '<td><button type="button" class="buttBorrar" id="Borrar:' + array[i].id + '">Borrar</button></td>';
        tabla += '<td><button type="button" class="buttModificar" onclick=\'cargaModificacion("' + array[i].id + '"\)\'>Modificar</button></td>';
        tabla += "</tr>";
    }

    tabla += "</table>";

    divSalida.innerHTML = tabla;

    aBorrar = document.querySelectorAll(".buttBorrar");
    for (i = 0; i < aBorrar.length; i++) {
        aBorrar[i].onclick = borrame;
    }
}


function obtenerObjeto() {
    var obj = {
        nombre: document.getElementById("txtNombre").value,
        duracion: parseInt(document.getElementById("txtDuracion").value)
    }

    return obj;
}
function refresca() {
    history.go(0);
}

muestraDatos();
document.getElementById("buttRefrescar").onclick = muestraDatos;
document.getElementById("buttOK").onclick = function () {
    if (modificando)
        ejecutaModificacion();
    else
        guardaDatos();
};