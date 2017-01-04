import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BeerinoService {

    private beerinoApiUrl = "http://localhost:3000/";

    private requestOptions = new RequestOptions({
         headers: new Headers({
             'authorization': 'Bearer' + localStorage.getItem('id_token'),
             'Content-Type': 'application/json'
         })
    });

    constructor(private http: Http) { }

    getUserBeerinos(): Observable<Beerino[]> {
        return this.http.get(this.beerinoApiUrl + 'beerinos', this.requestOptions)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    getBeers(): Observable<Beer[]> {
        return this.http.get(this.beerinoApiUrl + 'beers', this.requestOptions)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
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
