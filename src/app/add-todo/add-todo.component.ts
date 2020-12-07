import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";
import {AkitaSessionStore} from "../state/akita.session.store";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  form: FormGroup

  constructor(private apiService: ApiService,
              private router: Router,
              private todoStore: AkitaSessionStore,) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    })
  }

  addTodo() {
    console.log('form:', this.form.value)
    this.todoStore.setLoading(true)
    this.apiService.addTask(
      this.form.controls.title.value,
      this.form.controls.description.value)
      .subscribe(res => {
        this.todoStore.update(state => {
          return {
            todos: [
              ...state.todos,
              res
            ]
          };
        });
        this.todoStore.setLoading(false)
        this.router.navigateByUrl('')
      });

  }

}
