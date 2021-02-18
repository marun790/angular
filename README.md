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

user component
        import { Component, OnInit } from '@angular/core';

        @Component({
        selector: 'app-todos',
        templateUrl: './todos.component.html',         -> all are decoratives
        styleUrls: ['./todos.component.css']
        })
        export class TodosComponent implements OnInit {

        name:string = 'arun';
        constructor() { }

        ngOnInit(): void {
        }

        }
