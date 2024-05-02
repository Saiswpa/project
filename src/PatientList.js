import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, TextField, makeStyles, Typography, Slide, Snackbar } from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon, Person as PersonIcon, Phone as PhoneIcon, Email as EmailIcon, EventNote as EventNoteIcon } from '@material-ui/icons'; // Added icons
import MuiAlert from '@material-ui/lab/Alert'; // Added Alert component

import { deletePatient, editPatient } from './patientSlice';

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: '2rem', // Changed font size for medium look
    marginBottom: theme.spacing(2),
    maxWidth: '80%', // Changed max width to medium size
    margin: 'auto', // Center the table
    marginTop: theme.spacing(2), // Add margin top
    fontFamily: 'Roboto', // Changed font family
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, // Added background gradient effect
    WebkitBackgroundClip: 'text', // Clip text to background
    WebkitTextFillColor: 'transparent', // Make text transparent
  },
  tableContainer: {
    maxWidth: '80%', // Changed max width to medium size
    margin: 'auto', // Center the table
    marginTop: theme.spacing(2), // Add margin top
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  table: {
    minWidth: 400, // Reduced table width for smaller format
  },
  tableCell: {
    fontWeight: 'bold',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transition: 'background-color 0.3s ease',
    },
  },
  dialogContent: {
    minWidth: '300px',
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  button: {
    margin: theme.spacing(1),
  },
  editButton: {
    backgroundColor: theme.palette.info.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const PatientList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const patients = useSelector(state => state.patients);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [patient, setPatient] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false); // State for controlling the alert
  const [alertMessage, setAlertMessage] = useState(''); // State for the alert
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // State for controlling the confirmation dialog
  const [actionType, setActionType] = useState(null); // State for indicating the type of action (edit/delete)

  const handleEditOpen = (index) => {
    setEditIndex(index);
    setPatient(patients[index]);
    setConfirmDialogOpen(true); // Open the confirmation dialog
    setActionType('edit'); // Set the action type to edit
  };

  const handleEditClose = () => {
    setOpen(false);
    setConfirmDialogOpen(false); // Close the confirmation dialog
  };

  const handleDelete = (index) => {
    setEditIndex(index);
    setConfirmDialogOpen(true); // Open the confirmation dialog
    setActionType('delete'); // Set the action type to delete
  };

  const handleConfirmAction = () => {
    if (actionType === 'edit') {
      setOpen(true); // Open the edit dialog
      setConfirmDialogOpen(false); // Close the confirmation dialog
    } else if (actionType === 'delete') {
      dispatch(deletePatient(editIndex));
      setAlertMessage('Patient information deleted successfully.'); // Set success message
      setAlertOpen(true); // Open the alert
      setConfirmDialogOpen(false); // Close the confirmation dialog
    }
  };

  const handleEditChange = (event) => {
    setPatient({ ...patient, [event.target.name]: event.target.value });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    dispatch(editPatient({ index: editIndex, newPatient: patient }));
    setOpen(false); // Close the edit dialog
    setAlertMessage('Patient information edited successfully.'); // Set success message
    setAlertOpen(true); // Open the alert
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false); // Close the alert
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom className={classes.header}>Patient List</Typography>
      <TableContainer component={Paper} className={classes.tableContainer} elevation={3}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>#</TableCell>
              <TableCell className={classes.tableCell}><PersonIcon /> Name</TableCell> {/* Added icons */}
              <TableCell className={classes.tableCell}><EventNoteIcon /> Age</TableCell> {/* Added icons */}
              <TableCell className={classes.tableCell}><PhoneIcon /> Contact</TableCell> {/* Added icons */}
              <TableCell className={classes.tableCell}><EmailIcon /> Email</TableCell> {/* Added icons */}
              <TableCell className={classes.tableCell}><EventNoteIcon /> Next Appointment</TableCell> {/* Added icons */}
              <TableCell className={classes.tableCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index} className={classes.tableRow}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>{patient.emailAddress}</TableCell>
                <TableCell>{patient.nextAppointment}</TableCell>
                <TableCell>
                  <Button variant="contained" className={classes.editButton} startIcon={<EditIcon />} onClick={() => handleEditOpen(index)}>Edit</Button>
                  <Button variant="contained" className={classes.deleteButton} startIcon={<DeleteIcon />} onClick={() => handleDelete(index)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleEditClose} TransitionComponent={Slide} maxWidth="sm" fullWidth>
        <DialogTitle className={classes.dialogTitle}>Edit Patient</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <form onSubmit={handleEditSubmit}>
            <TextField autoFocus margin="dense" name="name" label="Name" type="text" fullWidth value={patient?.name} onChange={handleEditChange} />
            <TextField margin="dense" name="age" label="Age" type="number" fullWidth value={patient?.age} onChange={handleEditChange} />
            <TextField margin="dense" name="phoneNumber" label="Phone Number" type="text" fullWidth value={patient?.phoneNumber} onChange={handleEditChange} />
            <TextField margin="dense" name="emailAddress" label="Email Address" type="email" fullWidth value={patient?.emailAddress} onChange={handleEditChange} />
            <TextField margin="dense" name="nextAppointment" label="Next Appointment" type="date" fullWidth value={patient?.nextAppointment} onChange={handleEditChange} InputLabelProps={{ shrink: true }} />
            <Button type="submit" color="primary" className={classes.button}>Save</Button>
            <Button onClick={handleEditClose} color="secondary" className={classes.button}>Cancel</Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* Confirmation dialog for edit and delete */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {actionType === 'edit' ? 'Are you sure you want to edit this patient?' : 'Are you sure you want to delete this patient?'}
          </Typography>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmAction} color="secondary">{actionType === 'edit' ? 'Edit' : 'Delete'}</Button>
        </DialogContent>
      </Dialog>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <MuiAlert onClose={handleAlertClose} severity="success" variant="filled">
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default PatientList;
