import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BeerinoService } from '../beerino.service';
import { BaseApiResponse }    from '../entities/baseApiResponse';
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
            .subscribe((res: BaseApiResponse) => {
              if (res.valid) {
                this.model = res.data as Beer;
                this.model.visible = res.data.visible.data[0] == 1;
                this.isNew = this.model.beerId == 0;
              }
            });
        }
      });
  }

  onSubmit() {
    this.beerinoService
      .saveBeer(this.model)
      .subscribe((res) => {
        if (this.isNew && res.valid) {
          this.model.beerId = +res.data.insertId;
          this.isNew = false;
        }
      });
  }
}
