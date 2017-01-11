import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BeerinoService } from '../beerino.service';

import { Beerino } from '../entities/beerino';

@Component({
  selector: 'app-beerino',
  templateUrl: './beerino.component.html',
  styleUrls: ['./beerino.component.scss']
})
export class BeerinoComponent implements OnInit {

  beerinoIsValid = false;
  isNew = true;
  model = new Beerino('', '', '<b>Type here you beer recipe.</b>', +localStorage.getItem('sys_userId'));

  constructor(
    private beerinoService: BeerinoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route
      .params
      .subscribe((params: Params) => {
        if (params["id"]) {
          this.beerinoService
            .getBeerino(params["id"])
            .subscribe((beerino: Beerino) => {
              this.model = beerino;
              this.beerinoIsValid = beerino != null && beerino.beerinoId != "";
              this.isNew = beerino == null || beerino.beerinoId == "";
            });
        }
      });
  }

  onSubmit() {
    this.beerinoService
      .saveBeerino(this.model)
      .subscribe((res: any) => {
        this.isNew = false;
      });
  }

  checkBeerinoIdentifier(beerinoId: string) {

  }

}
