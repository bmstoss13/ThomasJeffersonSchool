import React from 'react'

const List = ({items, onEdit, onDelete}) => {
    
    return (
        <div>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <span>{item.first_name}{item.last_name}</span>
                        <div>
                            <button onClick={() => onEdit(item)}>Edit</button>
                            <button onClick={() => onDelete(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List