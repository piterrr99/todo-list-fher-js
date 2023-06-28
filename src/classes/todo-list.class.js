import { Todo } from "./index";
import { pendientesHtml } from "../js/componentes";


export class TodoList{

    static _numPendientes = 0;
    

    constructor(){
        // this.todos = [];
        this.cargarLocalStorage();
    };

    nuevoTodo(todo){
        this.todos.push(todo);
        TodoList._numPendientes++;
        this.guardarLocalStorage();
    };

    eliminarTodo(id){
        this.todos = this.todos.filter(todo=> todo.id != id)
        TodoList._numPendientes = 0;
        for(const todo of this.todos){
            if(!todo.completado){
                TodoList._numPendientes++;
            }
        }
        this.guardarLocalStorage();
    };

    marcarCompletado(id){

        for(const todo of this.todos){

            console.log(todo.id, id);
            if(todo.id == id){

                todo.completado = !todo.completado;
                (todo.completado)? TodoList._numPendientes-- : TodoList._numPendientes++;
                break;
            }
        }
        this.guardarLocalStorage();
    };

    eliminarCompletados(){
        this.todos = this.todos.filter(todo=> !todo.completado)       
        this.guardarLocalStorage();
    }

    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify(this.todos));
        localStorage.setItem('pendiente', JSON.stringify(TodoList._numPendientes));
    };

    cargarLocalStorage(){

        this.todos = (localStorage.getItem('todo')) 
                        ? JSON.parse(localStorage.getItem('todo')) 
                        : [];
        
        this.todos = this.todos.map(obj=>Todo.fromJson(obj))

        TodoList._numPendientes = JSON.parse(localStorage.getItem('pendiente'));
        pendientesHtml.innerText = TodoList._numPendientes;

    };
}