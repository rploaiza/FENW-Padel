$("form").ready(function () {
    $("#form").validate({
        rules: {
            userid: "required",
            password: "required"
        },
        messages: {
            userid: "El campo es obligatorio ingresa un usuario.",
            password: "El campo es obligatorio ingresa tu password."
        }
    });

    $("#form").valid();
    $("#btn").click(function () {
        if ($("#form").valid() === true) {
            var response = grecaptcha.getResponse();
            if (response.length == 0)
                alert("Error: Pulsa en el Captcha");
            else
                login();
        }
    });
});