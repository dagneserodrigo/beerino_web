import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { BeerinoService } from '../beerino.service';

import { Beerino } from '../entities/beerino';
import { Task } from '../entities/task';

@Component({
  selector: 'app-beerinos',
  templateUrl: './beerinos.component.html',
  styleUrls: ['./beerinos.component.scss']
})
export class BeerinosComponent implements OnInit {

  infoMessage = "";
  errorMessage = "";
  currentBeerName: string;
  currentTask = new Task(null, 0, 0, 0, 0);
  beerinos: Beerino[];
  constructor(
    private authService: AuthService,
    private beerinoService: BeerinoService,
    private router: Router
  ) {
    if (!authService.authenticated())
      this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.getBeerinos();
  }

  onModalShow(beerId: number, taskId?: number) {
    this.beerinoService
      .getBeer(beerId)
      .subscribe((res) => {
        if (res.valid) {
          this.currentBeerName = res.data.name;
        }
      },
      errorMessage => {
        this.errorMessage = errorMessage;
        setTimeout(() => { this.errorMessage = ""; }, 10000);
      });

    if (taskId)
      this.beerinoService
        .getTask(taskId)
        .subscribe((res) => {
          if (res.valid)
            this.currentTask = res.data as Task;
        },
        errorMessage => {
          this.errorMessage = errorMessage;
          setTimeout(() => { this.errorMessage = ""; }, 10000);
        });
  }

  private getBeerinos() {
    this.beerinoService
      .getUserBeerinos()
      .subscribe(
      res => {
        if (res.valid) {
          this.beerinos = [].concat(res.data) as Beerino[];
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

  deleteBeerino(beerinoId: string) {
    this.beerinoService
      .deleteBeerino(beerinoId)
      .subscribe((res) => {
        if (res.valid && res.data.affectedRows == 1) {
          for (let i = 0; i < this.beerinos.length; i++) {
            if (this.beerinos[i].beerinoId == beerinoId) {
              this.beerinos.splice(i, 1);
              this.infoMessage = "Beerino deleted.";
              setTimeout(() => { this.infoMessage = ""; }, 10000);
              break;
            }
          }
        } else if (res.valid && res.data.affectedRows == 0) {
          this.errorMessage = "No Beerino deleted. Verify and try again.";
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
