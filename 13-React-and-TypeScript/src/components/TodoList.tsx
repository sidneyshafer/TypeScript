import Todo from "../models/Todo";

import './TodoList.css';

interface TodoListProps {
    items: Todo[];
    onDeleteTodo: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = props => {
    
    return (
        <ul>
            {props.items.map(i => (
                <li key={i.id}>
                    <span>{i.text}</span>
                    <button 
                    onClick={props.onDeleteTodo.bind(null, i.id)}>
                        DELETE</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;