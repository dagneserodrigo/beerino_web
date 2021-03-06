import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { BeerinoService } from '../beerino.service';

import { BaseApiResponse }    from '../entities/baseApiResponse';
import { Beer } from '../entities/beer';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent implements OnInit {

  infoMessage = "";
  errorMessage = "";
  model = new Beer(null, "", "", "<b>Type the beer recipe here.</b>", true, +localStorage.getItem('sys_userId'));
  isNew = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private beerinoService: BeerinoService,
    private router: Router
  ) {
    if (!authService.authenticated())
      this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.activatedRoute
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
              } else {
                if (typeof res.message == "string")
                  this.errorMessage = res.message;
                else
                  res.message.map((message) => {
                    this.errorMessage += message + "<br />";
                  });

                setTimeout(() => { this.errorMessage = ""; }, 10000);
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
          this.model.beerId = +res.data.beerId;
          this.isNew = false;
          this.infoMessage = "New beer added!";
          setTimeout(() => { this.errorMessage = ""; }, 10000);
        } else if (!this.isNew && res.valid) {
          this.infoMessage = "Beer updated!";
          setTimeout(() => { this.errorMessage = ""; }, 10000);
        } else {
            if (typeof res.message == "string")
              this.errorMessage = res.message;
            else
              res.message.map((message) => {
                this.errorMessage += message + "<br />";
              });

            setTimeout(() => { this.errorMessage = ""; }, 10000);
        }
      });
  }
}
