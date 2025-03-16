import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NgIf } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { AxiosError } from 'axios';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [NgIf, LoadingComponent, MatCardModule, MatListModule, MatButtonModule, NgFor],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  public movie: MovieModel | null = null
  public error: string | null = null

  public constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      MovieService.getMovieById(params['id'])
        .then(rsp => {
          this.movie = rsp.data
        })
        .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
    })
  }

  public bookTicket() {
    const result = UserService.createTicket({
      id: new Date().getTime(),
      title: this.movie!.title,
      runTime: this.movie!.runTime,
      scheduledAt: "2025-03-13 10:00",
      price : 50,
      status: 'booked',
      rating : null
    })

    result ? alert('Film uspesno dodat u korpu') : alert('Morate biti ulogovani kako bi ste rezervisali kartu')
  }
}
