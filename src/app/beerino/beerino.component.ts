import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { BeerinoService } from '../beerino.service';

import { BaseApiResponse }    from '../entities/baseApiResponse';
import { Beer } from '../entities/beer';
import { Beerino } from '../entities/beerino';

@Component({
  selector: 'app-beerino',
  templateUrl: './beerino.component.html',
  styleUrls: ['./beerino.component.scss']
})
export class BeerinoComponent implements OnInit {

  infoMessage = "";
  errorMessage = "";
  beerinoIsValid = false;
  isNew = true;
  beers: Beer[];
  model = new Beerino('', '', '', +localStorage.getItem('sys_userId'), null, null, null);

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
    this.beerinoService
      .getBeers()
      .subscribe((res) => {
        if (res.valid) {
          this.beers = res.data as Beer[];
        }
      });
    this.activatedRoute
      .params
      .subscribe((params: Params) => {
        if (params["id"]) {
          this.beerinoService
            .getBeerino(params["id"])
            .subscribe((res: BaseApiResponse) => {
              if (res.valid) {
                this.model = res.data as Beerino;
                this.beerinoIsValid = res.data.beerinoId != "";
                this.isNew = res.data.beerinoId == "";
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
      },
      errorMessage => {
        this.errorMessage = errorMessage;
        setTimeout(() => { this.errorMessage = ""; }, 10000);
      });
  }

  onChange() {
    this.model.currentTaskId = null;
    this.model.currentTemperature = null;
  }

  onSubmit() {
    this.model.currentBeerId = this.model.currentBeerId.toString() == "null" ? null : this.model.currentBeerId;
    this.beerinoService
      .saveBeerino(this.model)
      .subscribe((res) => {
        if (this.isNew && res.valid) {
          this.isNew = false;
          this.infoMessage = "New beerino added!";
          setTimeout(() => { this.errorMessage = ""; }, 10000);
        } else if (!this.isNew && res.valid) {
          this.infoMessage = "Beerino updated!";
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
      },
      errorMessage => {
        this.errorMessage = errorMessage;
        setTimeout(() => { this.errorMessage = ""; }, 10000);
      });
  }

  checkBeerinoIdentifier(beerinoId: string) {
    this.beerinoService
      .getBeerino(beerinoId)
      .subscribe(
      () => { },
      (res: string) => {
        try {
          var statusCode = +res.substr(0, 3);
          if (statusCode == 404) {
            var strJsonRes = res.substr(16).trim();
            var jsonRes = JSON.parse(strJsonRes) as BaseApiResponse;
            this.beerinoIsValid = !jsonRes.valid && jsonRes.message[0] != 'Identificador do Beerino Inv&#225;lido';
          }
        } catch (err) {
          console.log(err);
        }
      });
  }

}
