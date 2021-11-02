import React, { Component, useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//For the menu
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const drawerWidth = 240
const { REACT_APP_SERVER_URL } = process.env;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    date: {
      flexGrow: 1
    },
    toolbar: theme.mixins.toolbar
  }
})

export default function Layout({children}) {
  const classes = useStyles()
  //handle pop up
  const [title, setTitle] = useState();
  const [details, setDetails] = useState();
  const [titleErr, setTitleError] = useState(false);
  const [detailsErr, setDetailsError] = useState(false);
  // handle add 
  const [open, setOpen] = React.useState(false);
  //form
  const [classForm, setClassForm] = useState({
    title: '',
    details: '',
    category: '',
  });
  const myChangeHandler = (event) => {
    setClassForm({ ...classForm, [event.target.name]: event.target.value });
    console.log("change form");
  };


  const history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    //console.log('close');
    setOpen(false);
  };

  

  const submitAddClassForm = async () => {
    console.log('add classes');
    try {
      await axios.post(`${REACT_APP_SERVER_URL}/classes/add`, classForm);
      setOpen(false);
      //await LoadCourses();
    } catch (error) {
      if (error.response) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

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
      console.log('add Course');
      submitAddClassForm();
    }
  };

  return (
    <div>
      {/* appbar  */}
      <AppBar>
        <Toolbar>
          <Typography>
            Trang chủ
          </Typography >
          {/* add button  */}
          <Button variant="outlined" onClick={handleClickOpen} style={{ marginLeft: "auto" }}>
            Open form dialog
          </Button>

          <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Thêm khoá học</DialogTitle>
          <DialogContent>
          <TextField
          onChange={(e) => {
            myChangeHandler(e);
            setTitle(e.target.value);
          }}
              autoFocus
              margin="dense"
              id="name"
              name = "title"
              label="Tên khoá học"
              type="input"
              fullWidth
              variant="standard"
              required
              error = {titleErr}
            />
            <TextField
             onChange={(e) => {
              myChangeHandler(e);
              setDetails(e.target.value);
            }}
              autoFocus
              margin="dense"
              id="name"
              name='details'
              label="Chi tiết khoá học"
              type="input"
              fullWidth
              variant="standard"
              required
              error = {detailsErr}
            />
            <TextField
             onChange={(e) => {
              myChangeHandler(e);
              setDetails(e.target.value);
            }}
              autoFocus
              margin="dense"
              id="name"
              name='category'
              label="Loại khoá học"
              type="input"
              fullWidth
              variant="standard"
              required
              error = {detailsErr}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Huỷ</Button>
            <Button onClick={handleSubmit}>Thêm</Button>
          </DialogActions>
        </Dialog>
          {/* end add button  */}
        </Toolbar>
      </AppBar>
      {/* side drawer  */}
      <div className = {classes.page}>
        <div className = {classes.toolbar}></div>
        {children}
        </div>
    </div>
  );
}