const express = require('express');
let pelisData = require('./pelis.json');
const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json());
app.get('/', (request, response) => {
    response.send('<h1>Bienvenido a la base de datos de pelis y series</h1><h2>Ingrese a la url /api/pelis</h2>');
});
app.get('/api/pelis', (request, response) => {
    response.json(pelisData);
});
app.get('/api/pelis/:id', (request, response) => {
    const id = Number(request.params.id);
    const peli = pelisData.find(peli => peli.id === id);
    if (peli) {
        response.json(peli);
    }
    else {
        response.status(404).end();
    }
});
app.delete('/api/pelis/:id', (request, response) => {
    const id = Number(request.params.id);
    pelisData = pelisData.filter(peli => peli.id !== id);
    response.status(204).end();
});
app.post('/api/pelis', (request, response) => {
    const peli = request.body;
    if (!peli || !peli.title || !peli.releaseDate || !peli.genre || !peli.rating || !peli.calification || !peli.comment) {
        return response.status(400).json({
            error: 'missing information'
        });
    }
    const ids = pelisData.map(peli => peli.id);
    const maxId = Math.max(...ids);
    const newPeli = {
        'id': maxId + 1,
        'title': peli.title,
        'releaseDate': peli.releaseDate,
        'genre': peli.genre,
        'rating': peli.rating,
        'calification': peli.calification,
        'comment': peli.comment
    };
    pelisData = pelisData.concat(newPeli);
    response.status(201).json(newPeli);
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
