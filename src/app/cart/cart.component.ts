import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router} from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { OrderModel } from '../../models/order.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [NgIf,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public displayedColumns: string[] = ['title', 'runTime', 'scheduledAt', 'price','actions'];
  public activeUser: UserModel | null = null
  public cart: OrderModel[] | null = null

  constructor(private router: Router) {
    if (!UserService.getActiveUser()) {
      router.navigate(['/home'])
      return
    }

    this.activeUser = UserService.getActiveUser()
    this.cart = this.activeUser?.orders.filter(order => order.status === "booked") || [];
  }

  public doPay(order: OrderModel) {
    if (UserService.changeOrderStatus('watched', order.id, order.title)) {
      this.activeUser = UserService.getActiveUser()
      this.cart = this.activeUser?.orders.filter(order => order.status === "booked") || [];
      alert('Karta za ' + order.title + ' je uspesno kupljena');
    }
  }

  public doCancel(order: OrderModel) {
      const arr = UserService.retrieveUsers()
      for (let user of arr) {
        if (user.email == this.activeUser!.email) {
            user.orders = this.activeUser?.orders.filter(currentOrder => currentOrder.id !== order.id) || []
            localStorage.setItem('users', JSON.stringify(arr))
        }
      }

      this.activeUser = UserService.getActiveUser()
      this.cart = this.activeUser?.orders.filter(order => order.status === "booked") || [];
      alert('Rezervacija za' + order.title + ' je otkazana')
    
  }
}
