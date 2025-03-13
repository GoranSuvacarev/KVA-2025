import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NgIf } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from "../loading/loading.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  imports: [NgIf, LoadingComponent, MatCardModule, MatListModule, MatButtonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  public movie: MovieModel | null = null

  public constructor(private route: ActivatedRoute, public utils: UtilsService) {
    route.params.subscribe(params => {
      MovieService.getMovieById(params['id'])
        .then(rsp => {
          this.movie = rsp.data
        })
    })
  }
/*
  public generateMapLink() {
    return `https://www.google.com/maps?output=embed&q=${this.flight?.destination}`
  }
*/
}
