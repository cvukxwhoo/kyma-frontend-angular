import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySubject: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  searchProducts(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/product/api/search`, {
      params: { name },
    });
  }
}
