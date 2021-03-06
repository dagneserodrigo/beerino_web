import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { BeerinoService } from '../beerino.service';

import { Task } from "../entities/task";
import { BaseApiResponse } from "../entities/baseApiResponse";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  infoMessage = "";
  errorMessage = "";
  beerId: number;
  tasks: Task[];

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
        if (params["beerId"]) {
          this.beerId = +params["beerId"];
          this.beerinoService
            .getBeerTasks(params["beerId"])
            .subscribe((res: BaseApiResponse) => {
              if (res.valid) {
                this.tasks = ([].concat(res.data)).sort((a, b) => a.order - b.order) as Task[];
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

  deleteTask(taskId: number) {
    this.beerinoService
      .deleteTask(taskId)
      .subscribe((res) => {
        if (res.valid && res.data.affectedRows == 1) {
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].taskId == taskId) {
              this.tasks.splice(i, 1);
              this.infoMessage = "Task deleted.";
              setTimeout(() => { this.infoMessage = ""; }, 10000);
              break;
            }
          }
        } else if (res.valid && res.data.affectedRows == 0) {
          this.errorMessage = "No Task deleted. Verify and try again.";
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
