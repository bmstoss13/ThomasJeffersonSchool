import React from 'react'
import '../styles/list.css'
import { Box, Typography, Grid, Paper, Table, TableHead, TableBody, TableCell, TableRow, IconButton, Pagination, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const List = ({items, onEdit, onDelete}) => {
    
    return (
        <div className="list-container">
            <ul className='list-items'>
                {items.map((item) => (
                    <li key={item.id} className="list-item">
                        <span className="item-name">{item.last_name}{", "}{item.first_name}</span>
                        <div className="button-container">
                            <InfoIcon className="edit-button" onClick={() => onEdit(item)}></InfoIcon>
                            <DeleteIcon className="delete-button" onClick={() => onDelete(item.id)}></DeleteIcon>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default List