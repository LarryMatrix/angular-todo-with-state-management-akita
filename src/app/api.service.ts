import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Todo} from "./todo.model";
import {environment} from "../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseURL = environment.baseURL

  constructor(private http: HttpClient) { }

  public addTask(title: string, description: string): Observable<Todo> {
    return this.http.post<Todo>(this.baseURL, {title, description})
  }

  public getTodos(): Observable<Todo[]> {
    return this.http.get<{data: Todo[]}>(this.baseURL).pipe(
      map((res) => res.data)
    );
  }

  public deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(`${this.baseURL}/${id}`)
  }

  public updateTodo(id: string, changes: any): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseURL}/${id}`, changes)
  }

}
