import { Component } from '@angular/core';

// Add the RxJS Observable operators.
import './rxjs-operators';

import { AuthService } from './auth.service';
import { BeerinoService } from './beerino.service';

@Component({
  selector: 'app-root',
  providers: [AuthService, BeerinoService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService) { }
}