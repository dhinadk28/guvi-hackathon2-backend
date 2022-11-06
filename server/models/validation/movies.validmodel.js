const joi = require('joi')
let AuthMovies = new joi.object({
    moviename:joi.string().required(),
    movieboughtdate:joi.string().required(),
    genre:joi.string().required(),
    duration:joi.string().required(),
    year:joi.string().required()
})
module.exports={AuthMovies}