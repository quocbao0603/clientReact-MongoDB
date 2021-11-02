import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from '@material-ui/core';
import { DeleteOutline } from '@mui/icons-material';


export default function NoteCard({note}) {
  return (
    <div>

      <Card elevation ={1}>
          <CardHeader
              action={
              <IconButton>
                  <DeleteOutline />
              </IconButton>
              }
               title={note.title}
               subheader={note.category}
          />
          <CardContent>
            <Typography variant = "body2" color = "textSecondary">
              {note.details}
            </Typography>
          </CardContent>
      </Card>
    </div>   
  )
}