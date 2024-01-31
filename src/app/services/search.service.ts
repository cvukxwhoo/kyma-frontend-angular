import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/product/api/search?term=${term}`
    );
  }
}
