import { Component, OnInit } from '@angular/core';
import { BeerinoService } from '../beerino.service';
import { Beerino } from '../entities/beerino';
import { Task } from '../entities/task';

@Component({
  selector: 'app-beerinos',
  templateUrl: './beerinos.component.html',
  styleUrls: ['./beerinos.component.scss']
})
export class BeerinosComponent implements OnInit {

  errorMessage: string;
  currentBeerName: string;
  currentTask = new Task(null, 0, 0, 0, 0);
  beerinos: Beerino[];
  constructor(private beerinoService: BeerinoService) { }

  ngOnInit() {
    this.getBeerinos();
  }

  onModalShow(beerId: number, taskId?:number) {
    this.beerinoService
      .getBeer(beerId)
      .subscribe((res) => {
        if (res.valid) {
          this.currentBeerName = res.data.name;
        }
      });

    if (taskId)
      this.beerinoService
        .getTask(taskId)
        .subscribe((res) => {
          if (res.valid)
            this.currentTask = res.data as Task;
        });
  }

  private getBeerinos() {
    this.beerinoService
      .getUserBeerinos()
      .subscribe(
      res => {
        if (res.valid) {
          this.beerinos = res.data as Beerino[];
        } else {
          this.errorMessage = res.message;
        }
      },
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
