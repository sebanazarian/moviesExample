const express = require('express');
const{moviesMock} = require('../utils/mocks/movies');
const MoviesService = require('../services/movies'); 

function moviesAPI(app){
  const router = express.Router();
  app.use("/api/movies",router);

  const moviesService = new MoviesService(); //IMPLEMENTO CAPA DE SERVICIO



  router.get("/", async function(req,res,next){ //LISTO PELICULAS
    const {tags} = req.query;
    try {
        const movies = await moviesService.getMovies({ tags})
        throw new Error('Error getting movies');
        
        res.status(200).json({
          data: movies,
          message:'movies listed'
        });
    } catch (err) {
        next(err);
    }
  });

  router.get('/:movieId', async function(req,res,next){  //TRAIGO DATOS DE UNA PELICULA EN PARTICULAR
    
    const { movieId} =req.params; //obtengo el parametro de la url

    try{
      const movies =  await moviesService.getMovie({movieId})
     


      res.status(200).json({
        data:movies,
        message: 'movie retrieved'
      })

    }catch(err){
        next(err)
    }
  });

  router.post('/', async function(req,res,next){  //CREO PELICULA
    const {body: movie} = req;
    try{
      const createMovieId = await moviesService.createMovie({movie})

      res.status(201).json({
        data: createMovieId,
        message: 'movie created'
      });
    }catch(err){
        next(err);
    }
  });

  router.put('/:movieId', async function(req,res,next){
    const {movieId} = req.params;
    const {body: movie} = req;

    try{
      const updateMovied = await moviesService.updateMovie(movieId, movie)

      res.status(200).json({
        data: updateMovied,
        message: 'movie updated'
      });
    }catch(err){
      next(err)
    }
  });

  router.patch("/:movieId", async function(req,res,next) {
		const {movieId} = req.params;
		const {body: movie} = req;		
		try {
			const updatedMovieId = await moviesService.partialUpdateMovie({movieId,movie});

			res.status(200).json({
				data:updatedMovieId,
				message: "movie updated partially"
			});
		}
		catch(error) {
			next(error);
		}
	});

  router.delete('/:movieId', async function(req,res,next){
    const {movieId} = req.params;
    try{
      // const deleteMovieid = await Promise.resolve(moviesMock[0].id) //ANTES SIN CAPA DE SERVICIOS
      const deleteMovieid = await moviesService.deletedMovie({movieId});


      res.status(200).json({
        data: deleteMovieid,
        message: 'movie eliminada'
      })
    }catch(err){
        next(err);
    }
  })

}

module.exports = moviesAPI;