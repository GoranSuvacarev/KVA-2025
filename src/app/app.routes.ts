import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '' }
]
