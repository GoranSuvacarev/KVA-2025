import { TicketModel } from "./ticket.model"

export interface UserModel {
    email: string
    firstName: string
    lastName: string
    phone: string
    address: string
    favoriteGenre: string
    password: string
    tickets: TicketModel[]
}