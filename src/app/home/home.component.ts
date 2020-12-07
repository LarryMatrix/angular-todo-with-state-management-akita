import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AkitaSessionQuery} from "../state/akita.session.query";
import {AkitaSessionStore} from "../state/akita.session.store";
import {filter, switchMap, take} from "rxjs/operators";
import {ApiService} from "../api.service";
import {Todo, TodoState} from "../todo.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading = false;
  todos: Todo[] = [];

  constructor(private router: Router,
              private todoQuery: AkitaSessionQuery,
              private todoStore: AkitaSessionStore,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.todoQuery.getIsLoading().subscribe(res => this.loading = res)
    this.todoQuery.getTodos().subscribe(res => this.todos = res)
    this.todoQuery.getLoaded().pipe(
      take(1),
      filter(res => !res),
      switchMap(() => {
        this.todoStore.setLoading(true)
        return this.apiService.getTodos()
      })
    ).subscribe(res => {
      this.todoStore.update(state => {
        return {
          todos: res
        };
      });
      this.todoStore.setLoading(false)
    }, error => {
      console.log('error: ', error)
      this.todoStore.setLoading(false)
    });
  }

  addTodo() {
    this.router.navigateByUrl('/add-todo')
  }

  markAsComplete(id: string) {
    this.apiService.updateTodo(id, {status: TodoState.DONE}).subscribe(
      res => {
        this.todoStore.update(
          state => {
            const todos = [...state.todos]
            const index = todos.findIndex(t => t._id === id)
            todos[index] = {
              ...todos[index],
              status: TodoState.DONE
            }
            return {
              ...state,
              todos
            }
          }
        )
      }, error => {
        console.log('error: ', error)
      }
    )
  }

  deleteTodo(id: string) {
    this.todoStore.setLoading(true)
    this.apiService.deleteTodo(id).subscribe(
      res => {
        this.todoStore.update(state => {
          this.todoStore.setLoading(false)
          return {
            ...state,
            todos: state.todos.filter(t => t._id !== id)
          }
        })
      },
      error => {
        this.todoStore.setLoading(false)
        console.log('error: ', error)

      }
    )
  }

}
