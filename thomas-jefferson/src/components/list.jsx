import React from 'react'

const List = ({items, onEdit, onDelete}) => {
    
    return (
        <div>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <span>{item.last_name}{", "}{item.first_name}</span>
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