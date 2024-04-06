const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

const productos = [
    { nombre: 'banana', imagen: 'banana.png' },
    { nombre: 'cebollas', imagen: 'cebollas.png' },
    { nombre: 'pimenton', imagen: 'pimenton.png' },
    { nombre: 'papas', imagen: 'papas.png' },
    { nombre: 'lechuga', imagen: 'lechuga.png' },
    { nombre: 'tomate', imagen: 'tomate.png' }
];

let carrito = [];

app.set("view engine", "handlebars"); 

app.engine('handlebars', exphbs.engine({
    extname: '.handlebars', // Extensiones de los archivos de plantillas
    defaultLayout: 'Main', // Plantilla principal
    layoutsDir: __dirname + '/views', // Directorio de las plantillas principales
    partialsDir: __dirname + '/views/partials' // Directorio de los partials
}));

app.use(express.static(__dirname + '/assets/img'));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist"));
app.use('/css', express.static(__dirname + '/assets/css'));
app.use('/front', express.static(__dirname + '/assets/js'));

app.get("/", function(req, res) {
    res.render("Main", {
        productos: productos,
        carrito: carrito
    });
});

app.get("/menu", function(req, res) {
    res.render("menu", {
        carrito: carrito
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});

app.use((req, res) => {
    res.send('Esta página no existe...');
});