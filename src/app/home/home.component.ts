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


  mvs = [
    { 
      title: 'Dogmen', 
      poster: 'https://taramountfilm.com/wp-content/uploads/2024/11/Dog-Man-za-TMF-sajt-360x618_c.jpg'
    },
    { 
      title: 'Gladijator 2', 
      poster: 'https://upload.wikimedia.org/wikipedia/sr/0/04/Gladiator_II_%282024%29_poster.jpg'
    },
    { 
      title: 'Nosferatu', 
      poster: 'https://www.movieposters.com/cdn/shop/files/466134593_1545730806058219_717512626744545926_n_480x.progressive.jpg?v=1734719953'
    },
    { 
      title: 'Mufasa', 
      poster: 'https://lumiere-a.akamaihd.net/v1/images/image_ce9ffbec.jpeg'
    },
    { 
      title: 'Brutalista', 
      poster: 'https://fwcdn.pl/fpo/97/78/10009778/8158016.3.jpg'
    },
    { 
      title: 'Izolacija', 
      poster: 'https://m.media-amazon.com/images/M/MV5BNTAzYzBlZDMtMjIzZi00M2EyLWJiYWQtNTI0MTlkMWJkMzFjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'
    },
    { 
      title: 'Pored nas', 
      poster: 'https://cinestarcinemas.rs/remote/185.155.226.145/movies/Pored%20nas/pored_nas_556x800.jpg?preset=film'
    }
  ];

  currentSlide = 0;

 
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.mvs.length - 1; 
    }
  }

  
  nextSlide() {
    if (this.currentSlide < this.mvs.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; 
    }
  }
}
