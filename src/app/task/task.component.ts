import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { BeerinoService } from '../beerino.service';

import { Task } from "../entities/task";
import { BaseApiResponse } from "../entities/baseApiResponse";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  isNew = true;
  model = new Task(null, 0, 0, 0, 0);

  constructor(
    private activatedRouteroute: ActivatedRoute,
    private authService: AuthService,
    private beerinoService: BeerinoService,
    private router: Router
  ) {
    if (!authService.authenticated())
      this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.activatedRouteroute
      .params
      .subscribe((params: Params) => {
        if (params["beerId"] && params["id"]) {
          this.beerinoService
            .getTask(+params["id"])
            .subscribe((res) => {
              if (res.valid) {
                this.model = res.data as Task;
                this.isNew = false;
              }
            });
        } else if (params["beerId"]) {
          this.model = new Task(null, 0, this.model.temperature, 0, +params["beerId"]);
        } else {
          //@TODO error!
        }
      });
  }

  onSubmit() {
    this.beerinoService
      .saveTask(this.model)
      .subscribe((res) => {
        if (this.isNew && res.valid) {
          this.model.taskId = +res.data.insertId;
          this.isNew = false;
        }
        //@TODO update beer.beerId
      });
  }
}
