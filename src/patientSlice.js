// src/patientSlice.js

import { createSlice } from '@reduxjs/toolkit';

const patientSlice = createSlice({
  name: 'patients',
  initialState: [],
  reducers: {
    addPatient: (state, action) => {
      state.push(action.payload);
    },
    editPatient: (state, action) => {
      // Replace the patient at the specified index with the new patient data
      const { index, newPatient } = action.payload;
      state[index] = newPatient;
    },
    deletePatient: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    }
  }
});

export const { addPatient, editPatient, deletePatient } = patientSlice.actions;

export default patientSlice.reducer;
