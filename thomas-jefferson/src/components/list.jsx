import React from 'react'

const list = ({items, onEdit, onDelete}) => {
    
    return (
        <div>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <span>{item.name}</span>
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

export default list