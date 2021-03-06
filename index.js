const express = require('express');
const app = express();

const {config} = require('./config/index');
const moviesApi = require('./routes/movies.js');

const { logErrors, errorHandler, wrapErrors} = require('./utils/middleware/errorHandlers.js')

const notFoundHandler = require('./utils/middleware/notFoundHandler.js');

app.use(express.json()) //permite a nuestras rutas datos de formatos json interpretarlos Middleware Body parser

// routes
moviesApi(app);

//captura el error 404
app.use(notFoundHandler);

//MANEJADORES DE ERRORES
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});




// app.get('/', function(req,res){
//   res.send("helslo")
// });

// app.get('/json', function(req, res) {
//   res.json({ hello: 'world' });
// });

// app.get('/fecha/:anio', function(req, res) {
//   const anio = req.params.anio;
//   if (((anio % 4 == 0) && (anio % 100 != 0 )) || (anio % 400 == 0)){
//     res.send('Es bisciesto');
//   }else{
//     res.send('No es bisciesto');
//   }
// });