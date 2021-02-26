import React, { useState, useEffect } from 'react';
import './index.css';
import Alert from './alert';
import List from './list';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  }
  return [];
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', msg: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, 'danger', 'Please add a Todo');
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Success value changed.');
    } else {
      showAlert(true, 'success', 'Todo added to the list');
      const newItems = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItems]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    return setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Todo removed!');
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const speceficItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(speceficItem.title);
  };

  // Local Storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  });

  return (
    <>
      <h1>What's the plane for today!</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <input
            type="text"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn-submit" type="submit">
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="todos-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button
            className="clear-items"
            type="button"
            onClick={() => {
              showAlert(true, 'danger', 'Todos list is empty');
              setList([]);
            }}
          >
            Clear Items
          </button>
        </div>
      )}
    </>
  );
}

export default App;
