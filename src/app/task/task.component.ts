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

  infoMessage = "";
  errorMessage = "";
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
                this.model.time = res.data.time / 60000;
                this.isNew = false;
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
        } else if (params["beerId"]) {
          this.model = new Task(null, 0, this.model.temperature, 0, +params["beerId"]);
        } else {
          this.router.navigate(['/beers'])
        }
      },
      errorMessage => {
        this.errorMessage = errorMessage;
        setTimeout(() => { this.errorMessage = ""; }, 10000);
      });
  }

  onSubmit() {
    let tmp = this.model;
    tmp.time = this.model.time * 60000;
    this.beerinoService
      .saveTask(tmp)
      .subscribe((res) => {
        if (this.isNew && res.valid) {
          this.model.taskId = +res.data.insertId;
          this.isNew = false;
          this.infoMessage = "New task added!";
          setTimeout(() => { this.errorMessage = ""; }, 10000);
        } else if (!this.isNew && res.valid) {
          this.infoMessage = "Task updated!";
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
}
