import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoModel} from "./todo.model";
import {environment} from "../environments/environment";

const URL = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  const API = URL;

  constructor(private http: HttpClient) { }

  private addTask(title: string, desc: string): Observable<TodoModel> {
    return this.http.post(`${this.API}`, title)
  }

}
