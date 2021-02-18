# angular
Angular demo
###Commands 
install node
>npm --version
>npm install -g @angular/cli
>ng --version
>ng new angular-todolist
>ng serve -o


Angular we have 
Modules - which holds all components
Coponents - which have combinations of style, html, controller
Service - will provide service for the component


app.module.ts -> is the root module for all the components and modules
                 when ever we creating components it will automatically registered in here
                 @NgModule({
                    declarations: [
                        AppComponent,   -> predefined component without any life cycle events
                        TodosComponent  -> created component which will have life cycle event
                    ],
                    imports: [
                        BrowserModule,
                        AppRoutingModule
                    ],
                    providers: [],
                    bootstrap: [AppComponent]
                    })

index.html will have <app-root> -> will check in app.module.ts like do we have selector for this component
then it will load the particluar component

>ng g c components/Todos
        this will create a component 'TPDOS' under 'component' folder. and the todo.component.ts will looks like below
todo.component.ts
        import { Component, OnInit } from '@angular/core';

        @Component({
                selector: 'app-todos',
                templateUrl: './todos.component.html',       -> all are decoratives
                styleUrls: ['./todos.component.css']
        })
        export class TodosComponent implements OnInit {

        name:string = 'arun'; -> added new state
        constructor() { }

        ngOnInit(): void {
        }

        }
in app.component.ts add the selector of todos compinet ref 'todos.component.ts' . selector 'app-todos' then we can see the todos componet html in the browser
after the above in app.component.html we will have only the code like below
<app-todos></app-todos>

create a folder 'models' under app.
create TODO.ts
TODO.ts:
        export class TODO{
                id: number;
                title: string;
                completed: boolean
                }
import and use TODO model in todo component

todo.component.ts:
        export class TodosComponent implements OnInit {

                todos: TODO[];

                constructor() {
                 this.todos = [{
                        id: 1,
                        title: 'TODO one',
                        completed: false
                        }, {
                        id: 2,
                        title: 'TODO two',
                        completed: true
                        },
                        {
                        id: 3,
                        title: 'TODO three',
                        completed: false
                        }
                ]
                }
use the 'todos' state in todo view
        <ul *ngFor="let todo of todos">
                <li>{{ todo.title }}</li>
        </ul>

>ng g c components/TodoItem
this will hold all the itms in the todos
class binding
        in html : <div [ngClass]="setClass()">
        in ts   :   setClass() {
                        let classes ={
                                todo: true,    //css propertie from todo-item-component.css
                                "is-complete": this.todo.completed //css propertie from todo-item-component.css
                                }
                        return classes;
                        }
>ng g s services/Todo
it will create a service, now get the data from that service.
in todo-service.ts            
```             
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor() {

  }

  getTodos() {
    return [{
      id: 1,
      title: 'TODO 1',
      completed: false
    }, {
      id: 2,
      title: 'TODO two',
      completed: false
    },
    {
      id: 3,
      title: 'TODO three',
      completed: false
    }
    ]
  }
}
```
in todos-component.ts
```
import { Component, OnInit } from '@angular/core';
import { TODO } from '../../models/TODO'
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: TODO[];

  constructor(private toDoService : TodoService) {
  }
  
  ngOnInit(): void {
    this.todos = this.toDoService.getTodos();
  }

}
```
