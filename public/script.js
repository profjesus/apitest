const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

$.get("http://localhost:3000/predicion/36057", function (data) {
    if (data) {
        container.textContent = data;
        /*data.forEach(movie => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const h1 = document.createElement('h1');
            h1.textContent = movie.title;

            const p = document.createElement('p');
            movie.description = movie.description.substring(0, 300);
            p.textContent = `${movie.description}...`;

            container.appendChild(card);
            card.appendChild(h1);
            card.appendChild(p);
        });*/
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
});
