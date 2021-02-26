import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="list-center">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="list-container">
            <p>{title}</p>
            <div className="btn-container">
              <button className="edit-item" onClick={() => editItem(id)}>
                <FiEdit />
              </button>
              <button className="remove-item" onClick={() => removeItem(id)}>
                <FiTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
