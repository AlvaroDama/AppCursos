var url = "https://alumnoscurso.azure-mobile.net/Tables/Curso";

function muestraDatos() {
    var ajax = new XMLHttpRequest();
    var cursos;
    var divSalida = document.getElementById("lista");
    var tabla = "<table><tr><th>Nombre</th><th>Duración</th></tr>";

    ajax.open("get", url, true);

    ajax.onreadystatechange = function () {
        if (ajax.readyState == ajax.DONE) {
            if (ajax.status >= 200 && ajax.status < 300) {
                cursos = JSON.parse(ajax.responseText);

            }
       
            else
                alert("Error " + ajax.error);
        }
    }


}

function guardaDatos() {
    var ajax = new XMLHttpRequest();
    var curso = {
        nombre: document.getElementById("txtNombre").value,
        duracion: document.getElementById("txtDuracion").value
    }
    
    ajax.open("post", url, true);
    ajax.setRequestHeader("Content-Type", "application/json");

    ajax.onreadystatechange = function () {
        if(ajax.readyState==ajax.DONE)
        {
            if(ajax.status>=200 && ajax.status<300)
                muestraDatos();
            else
                alert("Error "+ajax.error);
        }

    }
    
    ajax.send(JSON.stringify(curso));
}