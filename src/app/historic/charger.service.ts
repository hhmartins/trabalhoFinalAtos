import { environment } from './../../environments/environment';
import { Historic } from './historic';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChargerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  public getHistoric(): Observable<Historic[]> {
    return this.http.get<Historic[]>(`${this.apiServerUrl}/historic/all`)
  }

  public addHistoric(historic: Historic): Observable<Historic> {
    return this.http.post<Historic>(`${this.apiServerUrl}/historic/add`, historic)
  }

  public addHistoricRandom(historic: Historic): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/historic/addRandom`, historic)
  }

  public updateHistoric(historic: Historic): Observable<Historic> {
    return this.http.put<Historic>(`${this.apiServerUrl}/historic/update`, historic)
  }
/*
  public deleteHistoric(historicId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/historic/delete/${historicId}`)
  }
*/
public deleteHistoric(historicId: any): Observable<void> {
  return this.http.delete<void>(`${this.apiServerUrl}/historic/delete/`.concat(historicId))
}

}
