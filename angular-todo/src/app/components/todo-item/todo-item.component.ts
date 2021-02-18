import { Component, OnInit, Input } from '@angular/core';
import { TODO } from '../../models/TODO';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: TODO;

  constructor() {

  }

  ngOnInit(): void {
  }

  setClass() {
    let classes ={
      todo: true,
        "is-complete": this.todo.completed
    }
    return classes;
  }

}
