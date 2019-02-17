const predicion = document.getElementById('predicion');
//const container = document.createElement('div');
//predicion.appendChild(container);

const citySelect = document.getElementById('localidade');
$('#localidade').change(function() {
    getPredFor($(this).val());
});

function getPredFor(cityCode) {
    $.get("http://localhost:3000/predicion/" + cityCode, function (data) {
        if (data) {
            var card = document.createElement('div');
            card.setAttribute('class', 'card');
            if (predicion.firstElementChild) {
                predicion.replaceChild(card, predicion.firstElementChild);
            } else {
                predicion.appendChild(card);
            }

            var cardBody = document.createElement('div');
            cardBody.setAttribute('class', 'card-body');
            card.appendChild(cardBody);

            var cardTitle = document.createElement('h5');
            cardTitle.setAttribute('class', 'card-title');
            cardTitle.textContent = data.titulo;
            cardBody.appendChild(cardTitle);

            var cardText = document.createElement('p');
            cardText.setAttribute('class', 'card-text');
            cardText.innerHTML = "Mínima: " + data.minima + "º<br>Máxima: " + data.maxima + "º";
            cardBody.appendChild(cardText);

            var horas = document.createElement('ul');
            horas.setAttribute('class', 'list-group list-group-flush');
            card.appendChild(horas);

            var manha = document.createElement('li');
            manha.setAttribute('class', 'list-group-item');
            manha.innerHTML = 'Mañá: <img src="https://www.meteogalicia.gal/datosred/infoweb/meteo/imagenes/meteoros/ceo/' 
                + data.ceoManha + '.png">';
            horas.appendChild(manha);

            var tarde = document.createElement('li');
            tarde.setAttribute('class', 'list-group-item');
            tarde.innerHTML = 'Tarde: <img src="https://www.meteogalicia.gal/datosred/infoweb/meteo/imagenes/meteoros/ceo/' 
                + data.ceoTarde + '.png">';
            horas.appendChild(tarde);

            var noite = document.createElement('li');
            noite.setAttribute('class', 'list-group-item');
            noite.innerHTML = 'Noite: <img src="https://www.meteogalicia.gal/datosred/infoweb/meteo/imagenes/meteoros/ceo/' 
                + data.ceoNoite + '.png">';
            horas.appendChild(noite);

            var cardBodyLink = document.createElement('div');
            cardBodyLink.setAttribute('class', 'card-body');
            card.appendChild(cardBodyLink);

            var cardLink = document.createElement('a');
            cardLink.setAttribute('href', data.fonte);
            cardLink.setAttribute('class', 'card-link');
            cardLink.textContent = "Ver en MeteoGalicia";
            cardBodyLink.appendChild(cardLink);
        } else {
            const errorMessage = document.createElement('error');
            errorMessage.textContent = `Non se puido obter a predicion`;
            predicion.appendChild(errorMessage);
        }
    });
}
