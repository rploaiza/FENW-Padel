function login() {
    $.ajax({
        url: "http://salonso.etsisi.upm.es/fenw/padel/login.php",
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            'userid': document.getElementById("userid").value,
            'password': document.getElementById("password").value
        },
        success: function (data, code, jqXHR) {
            try {
                var header = jqXHR.getResponseHeader('Authorization');
                if (header === null) throw " En el sistema no existe un usuario con el identificador de usuario o clave proporcionada. ";
                var token = header.split(" ")[1];
                sessionStorage.setItem("PadelAppJWT", token);
                window.location.href = 'reservar.html';
            }
            catch (err) {
                document.getElementById("alerta").innerHTML = err;
            }
        },
        error: function (data, code) {
            if (data.status === 0) {
                alert('Not connect: Verify Network.');
            } else if (data.status == 404) {
                alert('Requested page not found [404]');
            } else if (data.status == 500) {
                alert('Internal Server Error [500].');
            } else if (code === 'parsererror') {
                alert('Requested JSON parse failed.');
            } else if (code === 'timeout') {
                alert('Time out error.');
            } else if (code === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error: ' + data.responseText);
            }
        }
    });
}

function control() {
    if (sessionStorage.getItem("PadelAppJWT") === null)
        window.location.href = 'login.html';

}

function logout() {
    sessionStorage.removeItem("PadelAppJWT");
    window.location.href = 'login.html';
}