import React from 'react'
import '../styles/list.css'

const List = ({items, onEdit, onDelete}) => {
    
    return (
        <div className="list-container">
            <ul className='list-items'>
                {items.map((item) => (
                    <li key={item.id} className="list-item">
                        <span className="item-name">{item.last_name}{", "}{item.first_name}</span>
                        <div className="button-container">
                            <button className="edit-button" onClick={() => onEdit(item)}>Edit</button>
                            <button className="delete-button" onClick={() => onDelete(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List