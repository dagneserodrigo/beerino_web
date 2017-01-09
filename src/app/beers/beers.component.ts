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
  constructor(private beerinoService: BeerinoService) { }

  ngOnInit() {
    this.getBeers();
  }

  getBeers() {
    this.beerinoService
      .getBeers()
      .subscribe(
      beers => this.beers = beers,
      errorMessage => this.errorMessage = errorMessage);
  }
}
