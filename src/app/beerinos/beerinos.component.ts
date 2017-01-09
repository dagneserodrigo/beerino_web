import { Component, OnInit } from '@angular/core';
import { BeerinoService } from '../beerino.service';
import { Beerino } from '../entities/beerino';

@Component({
  selector: 'app-beerinos',
  templateUrl: './beerinos.component.html',
  styleUrls: ['./beerinos.component.scss']
})
export class BeerinosComponent implements OnInit {

  errorMessage: string;
  beerinos: Beerino[];
  constructor(private beerinoService: BeerinoService) { }

  ngOnInit() {
    this.getBeerinos();
  }

  private getBeerinos() {
    this.beerinoService
      .getUserBeerinos()
      .subscribe(
      beerinos => this.beerinos = beerinos,
      errorMessage => this.errorMessage = errorMessage);
  }

  deleteBeerino(beerinoId: string) {
    this.beerinoService
      .deleteBeerino(beerinoId)
      .subscribe(() => {
        for (let i = 0; i < this.beerinos.length; i++) {
          if (this.beerinos[i].beerinoId == beerinoId) {
            this.beerinos.splice(i, 1);
            break;
          }
        }
      });
  }

}
