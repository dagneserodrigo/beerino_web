import { Component, OnInit } from '@angular/core';

import { BeerinoService } from '../beerino.service';
import { Beer } from '../entities/beer';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit {

  beer: Beer;

  constructor(private beerinoService: BeerinoService) { }

  ngOnInit() {
  }
}
