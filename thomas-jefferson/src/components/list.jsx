import React from 'react'
import '../styles/list.css'
import { Box, Typography, Grid, Paper, Table, TableHead, TableBody, TableCell, TableRow, IconButton, Pagination, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const List = ({items, onEdit, onDelete}) => {
    
    return (
        <div className="list-container">
            <ul className='list-items'>
                {items.map((item) => (
                    <li key={item.id} className="list-item">
                        <span className="item-name">{item.last_name}{", "}{item.first_name}</span>
                        <div className="button-container">
                            <EditIcon className="edit-button" onClick={() => onEdit(item)}></EditIcon>
                            <DeleteIcon className="delete-button" onClick={() => onDelete(item.id)}></DeleteIcon>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List