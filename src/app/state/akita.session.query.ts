import {Query} from "@datorama/akita";
import {AkitaSessionStore, TodoState} from "./akita.session.store";
import {Observable} from "rxjs";
import {Todo} from "../todo.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root' // just before your class
})
export class AkitaSessionQuery extends Query<TodoState> {
  constructor(private todoStore: AkitaSessionStore) {
    super(todoStore);
  }

  getTodos(): Observable<Todo[]> {
    return this.select(state => state.todos);
  }

  getLoaded(): Observable<boolean> {
    return this.select(state => state.isLoaded)
  }

  getIsLoading(): Observable<boolean> {
    return this.selectLoading()
  }

}
