import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Container } from '@material-ui/core';
import NoteCard from '../components/NoteCard';
import axios from 'axios';
const { REACT_APP_SERVER_URL } = process.env;
//const classes = require('../components/classesService');

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const LoadCourses = async () => {
    //old version
    try {
      const response = await axios.get(`${REACT_APP_SERVER_URL}/classes`);
      setNotes(response.data.classes);
    } catch (error) {
      if (error.response) return error.response.data;
      else return { success: false, message: error.message };
    }
  }
  useEffect(() => {LoadCourses()
  }, [])

  // const handleDelete = async(id) => {
  //   await fetch(`http://localhost:8000/notes/${id}`, {
  //     method: 'DELETE',
  //   })
  //   const newNotes = notes.filter(note => note.id !== id);
  //   setNotes(newNotes);
  // }
  return (
    <Container>
      <Grid container spacing = {3}>
      {notes.map(note => (
        <Grid item key={note.id} xs = {12} md = {6} lg = {4}>
          <Paper>
          <NoteCard note = {note}/>
          </Paper>
        </Grid>
      ))}  
      </Grid>
    </Container>
  )
}