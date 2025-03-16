import { TicketModel } from "../models/ticket.model"
import { UserModel } from "../models/user.model"

export class UserService {

    static retrieveUsers(): UserModel[] {
        if (!localStorage.getItem('users')) {
            const arr: UserModel[] = [
                {
                    email: 'user@example.com',
                    firstName: 'Example',
                    lastName: 'User',
                    phone: '+3816123456789',
                    address: 'Mokroluska 14, Vozdovac',
                    favoriteGenre: 'Fantazija',
                    password: 'user123',
                    tickets: []
                }
            ]

            localStorage.setItem('users', JSON.stringify(arr))
        }

        return JSON.parse(localStorage.getItem('users')!)
    }

    static createUser(model: UserModel) {
        const users = this.retrieveUsers()

        for (let u of users) {
            if (u.email === model.email)
                return false
        }

        users.push(model)
        localStorage.setItem('users', JSON.stringify(users))
        return true
    }

    static login(email: string, password: string): boolean {
        for (let user of this.retrieveUsers()) {
            if (user.email === email && user.password === password) {
                localStorage.setItem('active', user.email)
                return true
            }
        }

        return false
    }

    static getActiveUser(): UserModel | null {
        if (!localStorage.getItem('active'))
            return null

        for (let user of this.retrieveUsers()) {
            if (user.email == localStorage.getItem('active')) {
                return user
            }
        }

        return null
    }

    static createTicket(ticket: TicketModel) {
        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.tickets.push(ticket)
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }

        return false
    }

    static changeTicketStatus(state: 'watched' , id: number, title : string) {
        const active = this.getActiveUser()
        if (active) {
            const arr = this.retrieveUsers()
            for (let user of arr) {
                if (user.email == active.email) {
                    for (let ticket of user.tickets) {
                        if (ticket.id == id) {
                            ticket.status = state
                        }
                    }
                    localStorage.setItem('users', JSON.stringify(arr))
                    return true
                }
            }
        }
        return false
    }


    static changeRating(r: boolean, id: number) {
        const active = this.getActiveUser()
        if (active) {
            const arr = this.retrieveUsers()
            for (let user of arr) {
                if (user.email == active.email) {
                    for (let ticket of user.tickets) {
                        if (ticket.id == id) {
                            if(ticket.rating == r){
                                ticket.rating = null
                            }
                            else{
                                ticket.rating = r
                            }
                        }
                    }
                    localStorage.setItem('users', JSON.stringify(arr))
                    return true
                }
            }
        }
        return false
    }

    static changePassword(newPassword: string): boolean {

        const arr = this.retrieveUsers()
        for (let user of arr) {
            if (user.email == localStorage.getItem('active')) {
                user.password = newPassword
                localStorage.setItem('users', JSON.stringify(arr))
                return true
            }
        }

        return false
    }
}