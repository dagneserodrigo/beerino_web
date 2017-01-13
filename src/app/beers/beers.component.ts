import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { BeerinoService } from '../beerino.service';
import { Beer } from '../entities/beer';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
  errorMessage: string;
  beers: Beer[];

  sysUserId = localStorage.getItem('sys_userId');

  constructor(private beerinoService: BeerinoService) { }

  ngOnInit() {
    this.getBeers();
  }

  getBeers() {
    this.beerinoService
      .getBeers()
      .subscribe(
      res => {
        if (res.valid) {
          this.beers = res.data as Beer[];
        } else {
          this.errorMessage = res.message;
        }
      },
      errorMessage => this.errorMessage = errorMessage);
  }

  deleteBeer(beerId: number) {
    this.beerinoService
      .deleteBeer(beerId)
      .subscribe(() => {
        for (let i = 0; i < this.beers.length; i++) {
          if (this.beers[i].beerId == beerId) {
            this.beers.splice(i, 1);
            break;
          }
        }
      });
  }
}
