import { Injectable }                              from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';

import { BaseApiResponse }    from './entities/baseApiResponse';
import { Beer }               from './entities/beer';
import { Beerino }            from './entities/beerino';
import { Task }               from './entities/task';
import { User }               from './entities/user';

@Injectable()
export class BeerinoService {

  private beerinoApiUrl = "http://localhost:3000/";

  private requestOptions = new RequestOptions({
    headers: new Headers({
      'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      'Content-Type': 'application/json'
    })
  });

  constructor(private http: Http) { }

  getUserBeerinos(): Observable<BaseApiResponse> {
    return this.http.post(this.beerinoApiUrl + 'beerinos', { userEmail: localStorage.getItem('email') }, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBeerino(beerinoId: string): Observable<BaseApiResponse> {
    return this.http.get(this.beerinoApiUrl + 'beerino/' + beerinoId, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveBeerino(beerino: Beerino): Observable<BaseApiResponse> {
    return this.http.post(this.beerinoApiUrl + 'beerino', beerino, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteBeerino(beerinoId: string): Observable<BaseApiResponse> {
    return this.http.delete(this.beerinoApiUrl + 'beerino/' + beerinoId, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBeers(): Observable<BaseApiResponse> {
    return this.http.post(this.beerinoApiUrl + 'beers', { userEmail: localStorage.getItem('email') }, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBeer(beerId: number): Observable<BaseApiResponse> {
    return this.http.get(this.beerinoApiUrl + 'beer/' + beerId, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveBeer(beer: Beer): Observable<BaseApiResponse> {
    return this.http.post(this.beerinoApiUrl + 'beer', beer, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);

  }

  deleteBeer(beerId: number): Observable<BaseApiResponse> {
    return this.http.delete(this.beerinoApiUrl + 'beer/' + beerId, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getBeerTasks(beerId: number): Observable<BaseApiResponse> {
    return this.http.post(this.beerinoApiUrl + 'tasks', { beerId: beerId }, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTask(taskId: number): Observable<BaseApiResponse> {
    return this.http.get(this.beerinoApiUrl + 'task/' + taskId, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveTask(task: Task): Observable<BaseApiResponse> {
    return this.http.post(this.beerinoApiUrl + 'task', task, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);

  }

  deleteTask(taskId: number): Observable<BaseApiResponse> {
    return this.http.delete(this.beerinoApiUrl + 'task/' + taskId, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);

  }

  getUser(email: string): Observable<BaseApiResponse> {
    return this.http.get(this.beerinoApiUrl + 'user/' + email, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
