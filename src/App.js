// src/App.js

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link, BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './patientSlice';
import AddPatient from './AddPatient';
import PatientList from './PatientList';
import Sidebar from './Sidebar';

const store = configureStore({
  reducer: {
    patients: patientReducer
  }
});

function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
      <Sidebar />
      <AddPatient />
      <PatientList />
    </Provider>
    </BrowserRouter>
  );
}

export default App;
