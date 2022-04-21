import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface Language {
  name: string;
  bytes: number;
}

export interface Repository {
  name: string;
  languages: Language[];
}

export interface User {
  login: string;
  name: string;
  bio: string;
  languages: any;
}

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  movies: Repository[] = [];
  constructor(private http: HttpClient) {}
  async getUser(name: string) {
    let response = await firstValueFrom(
      this.http.get<any>(`http://127.0.0.1:5000/user/${name}`)
    );
    return response;
  }
  async getRepositories(name: string) {
    let response = await firstValueFrom(
      this.http.get<any>(`http://127.0.0.1:5000/repositories/${name}`)
    );
    console.log(response);
    return response;
  }
}
