import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TODO } from '../../models/TODO';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  @Output() addToDo:EventEmitter<TODO> = new EventEmitter();
  @Input() name:string;

  title:string;

  constructor() {
  }

  ngOnInit(): void {
    this.title = name;
  }

  addTodo(){
    const todo = {
       title: this.title,
       completed: false 
    }
    this.addToDo.emit(todo);
    this.title = '';
  }

}
