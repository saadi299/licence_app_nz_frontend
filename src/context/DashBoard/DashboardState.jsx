'use client'

// DashboardState.js

import React, { useReducer } from 'react';
import DashboardContext from './DashboardContext';
import dashboardReducer from './DashboardReducer';
import { TRIGGER_UPDATE } from './DashboardType'; // Import action type constant

const DashboardState = ({ children }) => {
  // Initial state
  const initialState = {
    updateTrigger: false,
  };

  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const triggerToUpdateDashboard = () => {
    dispatch({ type: TRIGGER_UPDATE });
  };

  return (
    <DashboardContext.Provider
      value={{
        updateTrigger: state.updateTrigger, 
        triggerToUpdateDashboard: triggerToUpdateDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
