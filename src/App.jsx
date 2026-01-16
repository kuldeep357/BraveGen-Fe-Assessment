import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import IntegrationCentre from './pages/IntegrationCentre';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Settings/Integrations" replace />} />

        <Route element={<DashboardLayout />}>
          <Route path="/Settings/Integrations" element={<IntegrationCentre />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
