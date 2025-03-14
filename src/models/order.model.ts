export interface OrderModel {
    id : number
    title: string
    runTime: number
    scheduledAt: string
    price: number
    status: 'booked' | 'watched' | 'reviewed'
}