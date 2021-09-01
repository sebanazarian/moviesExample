// const { moviesMock } = require('../utils/mocks/movies');
const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    // const movies = await Promise.resolve(moviesMock);
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }

  async getMovie({ movieId }) {
    // const movie = await Promise.resolve(moviesMock[0]);
    const movie = await this.mongoDB.get(this.collection, movieId);

    return movie || {};
  }

  async createMovie({ movie }) {
    // const createMovieId = await Promise.resolve(moviesMock[0].id);
    const createMovieId = await this.mongoDB.create(this.collection, movie);

    return createMovieId;
  }

  async updateMovie({ movieId, movie }) {
    // const updatedMovieId = await Promise.resolve(moviesMock[0].id);
    const updatedMovieId = await this.mongoDB.update(
      this.collection,
      movieId,
      movie
    );

    return updatedMovieId;
  }

  // async partialUpdateMovie() {
  //   const updatedMovieId = await Promise.resolve(moviesMock[0].id);
  //   return updatedMovieId;
  // }

  async deletedMovie({ movieId }) {
    // const deletedMovie = await Promise.resolve(moviesMock[0].id);
    const deletedMovie = await this.mongoDB.delete(this.collection, movieId);

    return deletedMovie;
  }
}

module.exports = MoviesService;
