import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TODO } from '../../models/TODO';
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: TODO;
  @Output() deleteTodo: EventEmitter<TODO> = new EventEmitter();

  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
  }

  onToggle(todo: TODO) {
    //set Task as completed
    todo.completed = !todo.completed;
    //update the details in server side
    this.todoService.toggleTaskCompleted(todo)
                  .subscribe(todo => {console.log(todo)});
  }

  onDelete(todo: TODO) {
    this.deleteTodo.emit(todo);
  }

  setClass() {
    let classes = {
      todo: true,
      "is-complete": this.todo.completed
    }
    return classes;
  }


}
