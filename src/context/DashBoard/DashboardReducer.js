// DashboardReducer.js

import { TRIGGER_UPDATE } from './DashboardType';

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case TRIGGER_UPDATE:
      return {
        ...state,
        updateTrigger: !state.updateTrigger,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
