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

    getBeerinos() {
        this.beerinoService
            .getUserBeerinos()
            .subscribe(
                beerinos => this.beerinos = beerinos,
                errorMessage => this.errorMessage = errorMessage);
    }

}
