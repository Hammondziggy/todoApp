import React, { useState } from 'react';
import useLocalStorage from './useLocalStorage';

const Todos = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');


  const addTodo = () => {
    if (inputTitle.trim() !== '') {
      const newTodo = {
        title: inputTitle,
        description: inputDescription,
      };
      setTodos([...todos, newTodo]);
      setInputTitle('');
      setInputDescription('');
    }
  };
  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };
  const toggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
    setTodos(updatedTodos);
  };
  const clearAllTodos = () => {
    setTodos([]);
  }
  
  return (
    <div>
      <div>
        <h1>Todo App</h1>
        <input
          type="text"
          placeholder="Title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <br/>
        <textarea
          placeholder="Description"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
        />
        <br/>
      </div>
      <br/>
      
      <button onClick={addTodo}>Add todo</button>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}    
            className="todo-item"
            style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}
          >
            <div className="todo-content">
              <h3>{todo.title}</h3>
              <div className="todo-description">
                {/* {todo.description} */}
                <span className="todo-description-tooltip">{todo.description}</span>
              </div>
            </div>
            <div className="todo-buttons">
              <button onClick={() => toggleCompletion(index)}>
                {todo.isCompleted ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => removeTodo(index)}>Remove</button>
            </div>
          </li>
        ))}
        
        
      </ul>   
      {todos.length > 0 && (
        <button onClick={clearAllTodos}>Clear</button>
      )}
    </div>
  );
};
export default Todos;
