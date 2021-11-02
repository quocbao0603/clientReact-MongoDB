import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import  Container  from '@material-ui/core/Container'
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
});


export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  
  const [titleErr, setTitleError] = useState(false);
  const [detailsErr, setDetailsError] = useState(false);
  const handleSubmit = (e) => {
    setTitleError(false);
    setDetailsError(false);
    e.preventDefault();
    if (title === undefined || title === '') {
      setTitleError(true);
    }
    if (details === undefined || details === '') {
      setDetailsError(true);
    }
    if (title && details) {
      //console.log(title, details);
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({title, details})
      }).then(()=> history.push('/'));
    }
  }

  return (
    <Container>
      <Typography 
      className={classes.title}
      variant="h5" component="h2"
      >
        Create a new note
      </Typography>
    
      <form noValidate autoComplete = "off" onSubmit = {handleSubmit}>
      <TextField
      onChange={(e) => {
        setTitle(e.target.value)
      }}
        className = {classes.field}
        label = "Note title"
        variant = "outlined"
        color = "secondary"
        fullWidth
        required
        error = {titleErr}
      />

      <TextField
      onChange={(e) => {
        setDetails(e.target.value)
      }}
        className = {classes.field}
        label = "Details"
        variant = "outlined"
        color = "secondary"
        multiline 
        rows = "4"
        fullWidth
        required
        error = {detailsErr}
      />
      {/* submit  */}
      <Button 
      className={classes.btn}
      //onClick = {() => {console.log('clicked')}}
      type = "submit" 
      color = "secondary" 
      startIcon = {<SendOutlinedIcon/>}
      endIcon = {<ArrowForwardIosOutlinedIcon/>}
      >
        Submit
      </Button>

      </form>

      
     

       {/* icon */}
       {/* <AcUnitOutlinedIcon /> */}
       {/* <br /> */}
    
   
    </Container>
    
  )
}
