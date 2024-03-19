import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

function TodoItem({ todo }: {
    todo: { id: string; title: string };
}) {
    return (
        <li key={todo.id} className="list-group-item">
            <button onClick={() => deleteTodo(todo.id)}> Delete </button>
            <button onClick={() => setTodo(todo)}> Edit </button>
            {todo.title}
        </li>
    );
}
export default TodoItem;