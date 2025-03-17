import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, RouterLink, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public email: string = ''
  public password: string = ''

  constructor(private router: Router, private snackBar: MatSnackBar) {
    if (UserService.getActiveUser()) {
      router.navigate(['/user'])
      return
    }
  }

  public doLogin() {
    if (UserService.login(this.email, this.password)) {
      this.router.navigate(['/'])
      return
    }

    this.showSnackBar('Pogrešan email ili lozinka', 'error');
  }

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    const config = {
      duration: 3000,
      horizontalPosition: 'center' as const,
      verticalPosition: 'top' as const,
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    };

    this.snackBar.open(message, 'Zatvori', config);
  }
}
