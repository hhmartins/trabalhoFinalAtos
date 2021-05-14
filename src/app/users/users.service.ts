import { Users } from './users';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }


  public getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiServerUrl}/users/all`)
  }

  public addUser(users: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiServerUrl}/users/add`, users)
  }

  public addUserRandom(users: Users): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/users/addRandom`, users)
  }

  public updateUser(users: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiServerUrl}/users/update`, users)
  }
/*
  public deleteHistoric(historicId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/historic/delete/${historicId}`)
  }
*/
public deleteUser(usersId: any): Observable<void> {
  return this.http.delete<void>(`${this.apiServerUrl}/users/delete/`.concat(usersId))
}

}
