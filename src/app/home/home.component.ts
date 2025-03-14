import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MovieModel } from '../../models/movie.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, LoadingComponent, RouterLink,FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public movies: MovieModel[] | null = null
  public error: string | null = null

  constructor(public utils: UtilsService) {
    MovieService.getMovies()
      .then(rsp => this.movies = rsp.data.slice(0,16))
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    const formattedDate = new Date(date).toLocaleDateString('sr-RS', options);
    return formattedDate ;
  }
}
