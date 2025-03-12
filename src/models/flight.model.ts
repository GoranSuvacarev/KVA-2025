import { ActorModel } from "./actor.model"
import { GenreModel } from "./genre.model"

export interface FlightModel {
    movieId: number
    directorId: number
    title: string
    description: string
    shortDescription : string
    poster: string
    startDate : string
    runTime: number
    movieActors : {
        actor : ActorModel
    }[]
    movieGenres: {
        genre : GenreModel
    }[]
}