import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MovieModel } from '../../models/movie.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatOption, MatSelect} from '@angular/material/select';
import {GenreModel} from '../../models/genre.model';

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, LoadingComponent, FormsModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public movies: MovieModel[] | null = null;
  public error: string | null = null;
  public genres: GenreModel[] = []
  public genreNames : string[] = ["Prikaži sve"]
  public genre = ''

  constructor(public utils: UtilsService, private router: Router) {
    MovieService.getMovies()
      .then(rsp => this.movies = rsp.data.slice(0,16))
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`);

    MovieService.getGenres()
      .then(rsp => {
        this.genres = rsp.data;

        for (let genre of this.genres) {
          let name = genre.name;
          this.genreNames.push(name);
        }
      })
  }

  goToDetails(movieId: number) {
    this.router.navigate(['/details', movieId]);
  }
}

