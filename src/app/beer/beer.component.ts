import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BeerinoService } from '../beerino.service';
import { Beer } from '../entities/beer';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit {

  model = new Beer(null, "", "", "<b>Type the beer recipe here.</b>", true, +localStorage.getItem('sys_userId'));
  isNew = true;

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
            .getBeer(params["id"])
            .subscribe((beer: Beer) => {
              this.model = beer;
              this.model.visible = beer.visible.data[0] == 1;
              this.isNew = beer == null || beer.beerId == 0;
            });
        }
      });
  }

  onSubmit() {
    this.beerinoService
      .saveBeer(this.model)
      .subscribe((res: any) => {
        this.isNew = false;
        //@TODO update beer.beerId
      });
  }
}
