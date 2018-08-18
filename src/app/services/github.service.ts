import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private username: string;
  private clientId = '152cbca15fd221bdc7b7';
  private clientSecret = '149caf389d0e1ecbde36e8a9f876c7d26b4fa8e8';

  constructor(private _http: Http) {
    console.log('Github service ready...');
    this.username = 'jaketollette';
  }

  getUser() {
    // tslint:disable-next-line:max-line-length
    return this._http.get('http://api.github.com/users/' + this.username + '?client_id='
            + this.clientId + '&client_secret=' + this.clientSecret)
        .pipe(
          map((res: Response) => res.json()),
          catchError((e: Response) => throwError(e))
        );
  }

  getRepos() {
    return this._http.get('http://api.github.com/users/' + this.username + '/repos?client_id='
            + this.clientId + '&client_secret=' + this.clientSecret)
        .pipe(
          map((res: Response) => res.json()),
          catchError((e: Response) => throwError(e))
        );
  }

  updateUser(username: string) {
    this.username = username;
  }
}
