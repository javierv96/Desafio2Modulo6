const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const productos = [
    { nombre: 'banana', imagen: 'banana.png', seleccionado:false },
    { nombre: 'cebollas', imagen: 'cebollas.png', seleccionado:false },
    { nombre: 'pimenton', imagen: 'pimenton.png', seleccionado:false },
    { nombre: 'papas', imagen: 'papas.png', seleccionado:false },
    { nombre: 'lechuga', imagen: 'lechuga.png', seleccionado:false },
    { nombre: 'tomate', imagen: 'tomate.png', seleccionado:false }
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

// Configura body-parser
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/agregar-al-carrito', (req, res) => {
    const productoNombre = req.body.nombre;
    const producto = productos.find(p => p.nombre === productoNombre);
    if (producto) {
        if (!producto.seleccionado) {
            producto.seleccionado = true;
            carrito.push(producto);
            console.log(producto.seleccionado);
        } else {
            console.log("El producto ya está en el carrito: " + productoNombre);
        }
        
    }
});

app.post('/quitar-del-carrito', (req, res) => {
    const productoNombre = req.body.nombre;
    const producto = productos.find(p => p.nombre === productoNombre);
    if (producto) {
        const index = carrito.indexOf(producto);
        if (index !== -1) {
            carrito.splice(index, 1);
            producto.seleccionado = false; // Cambiar el estado del producto a no seleccionado
            console.log("Producto eliminado del carrito: " + productoNombre);
            res.send('Producto eliminado del carrito.');
            console.log(producto.seleccionado);
        } else {
            console.log("El producto no se encontró en el carrito: " + productoNombre);
            res.send('El producto no se encontró en el carrito.');
        }
    } else {
        console.log("El producto no existe: " + productoNombre);
        res.send('El producto no existe.');
    }
});

app.get("/", function (req, res) {
    res.render("Main", {
        productos: productos,
        carrito: carrito
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});

app.use((req, res) => {
    res.send('Esta página no existe...');
});