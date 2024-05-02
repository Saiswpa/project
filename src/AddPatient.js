import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Grid, Dialog, DialogTitle, DialogContent, makeStyles, Slide, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'; // Import Alert component from Material UI lab
import { addPatient } from './patientSlice';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
  },
  addButton: {
    marginTop: theme.spacing(2),
    maxWidth: '80%', // Changed max width to medium size
    padding: '8px 16px', // Adjusted button size to medium
    background: '#f5f5f5', // Updated background color to light gray
    borderRadius: 25, // Increased border radius for a more rounded button
    border: 0,
    color: '#333', // Changed text color to a darker shade for better contrast
    boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)', // Updated box shadow color
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)', // Scale up on hover
      boxShadow: '0px 0px 15px rgba(76, 175, 80, .5)', // Updated shadow on hover
    },
  },
  saveButton: {
    marginRight: theme.spacing(2),
    background: '#4caf50', // Updated background color to green
    color: '#fff', // Changed text color to white
    '&:hover': {
      background: '#388e3c', // Darker green on hover
    },
  },
  cancelButton: {
    background: '#f44336', // Updated background color to red
    color: '#fff', // Changed text color to white
    '&:hover': {
      background: '#d32f2f', // Darker red on hover
    },
  },
  appBar: {
    backgroundColor: '#1976d2', // Set navbar color
  },
  title: {
    flexGrow: 1,
  },
  dialogTitle: {
    marginTop: theme.spacing(2), // Add margin to the dialog title
  },
}));

const AddPatient = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    emailAddress: '',
    nextAppointment: ''
  });
  const [alertOpen, setAlertOpen] = useState(false); // State for controlling the alert
  const [alertMessage, setAlertMessage] = useState(''); // State for the alert message

  const handleChange = (event) => {
    setPatient({ ...patient, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addPatient(patient));
    setPatient({
      name: '',
      age: '',
      phoneNumber: '',
      emailAddress: '',
      nextAppointment: ''
    });
    setOpen(false);
    setAlertMessage('Patient information saved successfully.'); // Set success message
    setAlertOpen(true); // Open the alert
  };

  const handleCancel = () => {
    setOpen(false);
    setAlertMessage('Operation canceled.'); // Set cancel message
    setAlertOpen(true); // Open the alert
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false); // Close the alert
  };

  return (
    <Grid container justify="flex-end">
      <Grid item xs={6} sm={4} md={3}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setOpen(true)} 
          fullWidth
          className={classes.addButton}
        >
          Add Patient
        </Button>
      </Grid>
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        className={classes.dialog}
        TransitionComponent={Slide} 
        transitionDuration={500} 
      >
        <DialogTitle className={classes.dialogTitle}>Add New Patient</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth name="name" value={patient.name} onChange={handleChange} label="Patient's Name" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="age" value={patient.age} onChange={handleChange} label="Age" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="phoneNumber" value={patient.phoneNumber} onChange={handleChange} label="Phone Number" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="emailAddress" value={patient.emailAddress} onChange={handleChange} label="Email Address" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth name="nextAppointment" value={patient.nextAppointment} onChange={handleChange} label="Next Appointment" type="date" InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" className={`${classes.saveButton} ${classes.button}`}>Save</Button>
                <Button variant="contained" className={`${classes.cancelButton} ${classes.button}`} onClick={handleCancel}>Cancel</Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AddPatient;
