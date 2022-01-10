import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, UserPicture } from 'src/PICTURE';

const httpOptions = {
  headers :new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private apiUrlforLogins = 'http://localhost:3000/logins'
  private apiUrlforPictures = 'http://localhost:3000/pictures'
  

  constructor(private http: HttpClient) { }

  getLogins(): Observable<Login[]> {
    return this.http.get<Login[]>(this.apiUrlforLogins);
  }

  getUserPictures(): Observable<UserPicture[]> {
    return this.http.get<UserPicture[]>(this.apiUrlforPictures);
  }

  updatePictures(statToUpdate: UserPicture): Observable<UserPicture> {
    const url = `${this.apiUrlforPictures}/${statToUpdate.user_id}`;

    // let p: UserPicture[] = []
    // //statToUpdate.timeofpay = new Date();
    // this.getUserPictures().subscribe((listReturn) => {
    //   p = listReturn
    //   let arr = []
    //   for (let k of listReturn) {
    //     arr.push(k.user_id)
    //   }
    //   p[arr.indexOf(statToUpdate.user_id)] = statToUpdate
    // })

    return this.http.put<UserPicture>(url, statToUpdate, httpOptions);

    
  }

  addAccount(accountToAdd: Login) {
    return this.http.post<Login>(this.apiUrlforLogins,accountToAdd, httpOptions)
    
  }

  addUserPicture(detailToAdd: UserPicture): Observable<UserPicture>{
    return this.http.post<UserPicture>(this.apiUrlforPictures,detailToAdd, httpOptions);
  }
}
