import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
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
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-details',
  imports: [NgIf, LoadingComponent, MatCardModule, MatListModule, MatButtonModule, NgFor, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  public movie: MovieModel | null = null
  public error: string | null = null
  isDescriptionExpanded: boolean = false;
  maxDescriptionLength: number = 800;

  public constructor(private route: ActivatedRoute, public utils: UtilsService) {
    route.params.subscribe(params => {
      MovieService.getMovieById(params['id'])
        .then(rsp => {
          this.movie = rsp.data
        })
        .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
    })
  }

  public bookTicket(time : string ,price : number) {
    const result = UserService.createTicket({
      id: new Date().getTime(),
      title: this.movie!.title,
      runTime: this.movie!.runTime,
      scheduledAt: this.utils.formatDate(this.movie!.startDate) + " " + time,
      price : price,
      status: 'booked',
      rating : null
    })

    result ? alert('Film uspesno dodat u korpu') : alert('Morate biti ulogovani kako bi ste rezervisali kartu')
  }

  toggleDescription(): void {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  getTruncatedDescription(): string {
    if (!this.movie || !this.movie.description) {
      return '';
    }

    if (this.isDescriptionExpanded || this.movie.description.length <= this.maxDescriptionLength) {
      return this.movie.description;
    } else {
      return this.movie.description.substring(0, this.maxDescriptionLength) + '...';
    }
  }

  shouldShowMoreButton(): boolean {
    return Boolean(this.movie?.description &&
      this.movie.description.length > this.maxDescriptionLength);
  }

  
}
