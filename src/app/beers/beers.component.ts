import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { BeerinoService } from '../beerino.service';
import { Beer } from '../entities/beer';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.scss']
})
export class BeersComponent implements OnInit {
  infoMessage: string;
  errorMessage: string;
  beers: Beer[];

  sysUserId = localStorage.getItem('sys_userId');

  constructor(
    private authService: AuthService,
    private beerinoService: BeerinoService,
    private router: Router
  ) {
    if (!authService.authenticated())
      this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getBeers();
  }

  getBeers() {
    this.beerinoService
      .getBeers()
      .subscribe(
      res => {
        if (res.valid) {
          this.beers = [].concat(res.data) as Beer[];
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

  deleteBeer(beerId: number) {
    this.beerinoService
      .deleteBeer(beerId)
      .subscribe((res) => {
        if (res.valid && res.data.affectedRows == 1) {
          for (let i = 0; i < this.beers.length; i++) {
            if (this.beers[i].beerId == beerId) {
              this.beers.splice(i, 1);
              this.infoMessage = "Beer deleted.";
              setTimeout(() => { this.infoMessage = ""; }, 10000);
              break;
            }
          }
        } else if (res.valid && res.data.affectedRows == 0) {
          this.errorMessage = "No Beer deleted. Verify and try again.";
          setTimeout(() => { this.errorMessage = ""; }, 10000);
        } else {
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
}
