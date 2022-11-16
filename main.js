let datosClima;
let forecast;
let ciudad;
let pais;
let mes;
let dia;
let cielo;
const d = new Date();

switch(d.getMonth() + 1) {
    case 1:
        mes = "Enero";
        break;
    case 2:
        mes = "Febrero";
        break;
    case 3:
        mes = "Marzo";
        break;
    case 4:
        mes = "Abril";
        break;
    case 5:
        mes = "Mayo";
        break;
    case 6:
        mes = "Junio";
        break;
    case 7:
        mes = "Julio";
        break;
    case 8:
        mes = "Agosto";
        break;
    case 9:
        mes = "Septiembre";
        break;
    case 10:
        mes = "Octubre";
        break;
    case 11:
        mes = "Noviembre";
        break;
    case 12:
        mes = "Diciembre";
        break;
};

switch(d.getDay()) {
    case 0:
        dia = "Domingo";
        break;
    case 1:
        dia = "Lunes";
        break;
    case 2:
        dia = "Martes";
        break;
    case 3:
        dia = "Miercoles";
        break;
    case 4:
        dia = "Jueves";
        break;
    case 5:
        dia = "Viernes";
        break;
    case 6:
        dia = "Sabado";
        break;
}

function selectorIcono() {

    $("#weather-icon").removeClass();
    
    switch(cielo) {
        case "Clear":
            $("#weather-icon").addClass("bi bi-brightness-high");
            break;
        case "Clouds":
            $("#weather-icon").addClass("bi bi-cloud");
            break;
        case "Drizzle":
            $("#weather-icon").addClass("bi bi-cloud-drizzle");
            break;
        case "Rain":
            $("#weather-icon").addClass("bi bi-cloud-rain-heavy");
            break;
    }
}

$(() => {
    let latitud;
    let longitud;

    $(".card-title").text(dia + " " + d.getDate() + " de " + mes);

    $("#buscar-btn").on("click", async function() {
        await fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + $("#ciudad").val() + "&limit=1&appid=e1b85edd5265ec61d8dfc9683249ed82")
            .then(response => response.json())
            .then(data => {
                ciudad = data[0]['name'];
                pais = data[0]['country'];
                latitud = data[0]['lat'];
                longitud = data[0]['lon'];
            });

        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitud + "&lon=" + longitud + "&units=metric&appid=e1b85edd5265ec61d8dfc9683249ed82")
            .then(response => response.json())
            .then(data => {
                datosClima = data;
                cielo = data['weather'][0]['main'];
                $("#grados").text(parseInt(data['main']['temp']) + "°");
                $("#termica").text("Térmica " + parseInt(data['main']['feels_like']) + "°");
                $("#ubicacion").text(ciudad + ", " + pais);
                $("#contenido").removeClass("invisible");
                selectorIcono();
            });
    });

    $("#ciudad").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#buscar-btn").click();
        }
    });
});