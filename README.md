# angular
Angular demo
key terms in angular
in angular we have architecture like modules and components
group of components are called as mogules -  basically the logical grouping of components are modules

Binding	Example
* Property Binding -	<input [placeholder]="placeholderValue" /> 
* String Interpolation -	<input placeholder="{{placeholderValue}}" /> 
* Attribute Binding	- <td [attr.colspan]="clspn"> 
* Style Binding	 - <input [style.borderStyle]="'dashed'" />
* Class Binding	- <input [class.active]="true" />
* Event Binding -	<input (keyup.enter)="onEnter()" />
* Two-way Binding	- <input [(ngModel)]="value" />


```
<app-todo-item 
    *ngFor="let todo of todos" 
    [todo] = "todo"
    (deleteToDo) = deleteToDo($event)> 
```

###Commands 
install node
>npm install -g @angular/cli
>npm --version
>npm install -g @angular/cli
>ng --version
>ng new angular-todolist
>ng serve -o


Angular we have 
Modules - which holds all components -> componet + router module
Coponents - which have combinations of style, html, controller
Service - will provide service for the component


app.module.ts -> is the root module for all the components and modules
                 when ever we creating components it will automatically registered in here
```                 
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
```
index.html will have <app-root> -> will check in app.module.ts like do we have selector for this component
then it will load the particluar component

>ng g c components/Todos
        this will create a component 'TPDOS' under 'component' folder. and the todo.component.ts will looks like below
````
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
```        
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
property binding '[ngClass]'

        in html : <div [ngClass]="setClass()">
        in ts   :   setClass() {
                        let classes ={
                                todo: true,    //css propertie from todo-item-component.css
                                "is-complete": this.todo.completed //css propertie from todo-item-component.css
                                }
                        return classes;
                        }

passing value from parent component to child component

in todos.component.html
```
  <app-todo-item 
    *ngFor="let todo of todos" 
    [todo] = "todo"
    (deleteToDo) = deleteToDo($event)> 
    <!-- [todo] = "todo" - property binding value from parent to child hrere todosComponent to todo-item.component there 
                            we will receive with @Input() todo:TODO--> 
    <!-- (deleteToDo) = deleteToDo($event)> -> event binding -->
  </app-todo-item>
```
in todo-item.components.ts
```
@Input() todo: TODO;
````
in todo-itm.component.html
```
<div [ngClass]="setClass()"> <!--  Dynamic class binding -->
    <input (change) = "onToggle(todo)" type="checkbox" >
    {{ todo.title }}------------------------------------------------> reading the binded value from @Input()
</div>
```

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
Event binding
binding frontend event with controller
todo-item-component.ts
```

  onToggle(todo:TODO) {
    console.log('onToggle')
  }

  onDelete(todo:TODO) {
    console.log('onDelete')
  }

```
todo-item.component.html
```
<div [ngClass]="setClass()"> <!--  Dynamic class binding -->
    <input (change) = "onToggle(todo)" type="checkbox" >
    {{ todo.title }}
    <button (click) = "onDelete(todo)" class="del">X</button>
</div>

```

```
Introducing HTTP module.
majoir imports:
import { HttpClientModule } from '@angular/common/http' -> Module for app-component
import {HttpClient, HttpHeaders } from '@angular/common/http'; -> for service
import { Observable } from 'rxjs';      -> for service

in app.module.ts:
```
import { HttpClientModule } from '@angular/common/http';

imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
```

in todo.services.ts
```
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // responcible for network call
import { Observable } from 'rxjs';        // responcible for reading response
import { TODO } from '../models/TODO';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoURI: string = 'https://jsonplaceholder.typicode.com';
  todo_limit:string = '/todos?_limit=5';

  constructor(private http: HttpClient) {

  }

  getTodos(): Observable<TODO[]> {
    return this.http.get<TODO[]>(`${this.todoURI}${this.todo_limit}`);
  }
}
```
in todo-component.ts:
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
    this.toDoService.getTodos().subscribe( todos => {
      this.todos = todos;
    });
  }

}
```

implement HTTP://POST
the toggling of task completion event is probagated to server
todo-item.component.ts
```
import { TodoService } from '../../services/todo.service'
.
.
.

constructor(private todoService: TodoService) {

  }

  onToggle(todo: TODO) {
    //set Task as completed
    todo.completed = !todo.completed;
    //update the details in server side
    this.todoService.toggleTaskCompleted(todo)
                  .subscribe(todo => {console.log(todo)});
  }
```
todo.service.ts
```
const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

  toggleTaskCompleted(todo:TODO): Observable<any> {
    const url = `${this.todoURI}/${todo.id}`;
    return this.http.put(url, todo, headerOptions);
  }
```
implement HTTP://DELETE via event emmiter
delete is littlebit tricky, we have to emmit an action from child to parrent and have to receive and do the action in parent

todo-item.component.ts
```
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Output() deleteToDo: EventEmitter<TODO> = new EventEmitter();


onDelete(todo: TODO) {
    this.deleteToDo.emit(todo); // this deleteToDo wich in @Ouput
  }
```
 todos.component.html
``` 
 <app-todo-item 
    *ngFor="let todo of todos" 
    [todo] = "todo"
    (deleteToDo) = deleteToDo($event)>
</app-todo-item>

```
todos.componetnt.ts
```
deleteToDo(todo: TODO) {
    this.todos = this.todos.filter(todoArg => todoArg.id != todo.id);
    this.toDoService.deleteToDo(todo).subscribe(todo => {
      console.log(todo)
    });
```

>ng g c components/layout/Header

add a dummy statuc component which not having any functionalities just a title


routing:
in app-routing.module.ts
```
import { TodosComponent } from './components/todos/todos.component';
import { AboutComponent } from './components/paegs/about/about.component'

const routes: Routes = [
  {path:'', component:TodosComponent},
  {path:'about', component:AboutComponent}
  
];
```
app.component.html
```
<router-outlet></router-outlet>
```
header.component.html
```
        <nav> 
          <a routerLink ="/">Home</a>|<a routerLink="/about">About</a> 
        </nav>
```
