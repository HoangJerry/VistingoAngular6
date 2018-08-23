import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {

  }

  getSearch(value) {
    return this.http.get('http://api.tvmaze.com/search/shows?q='+value)
  }

}
