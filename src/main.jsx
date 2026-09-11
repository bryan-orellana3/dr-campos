import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './shared/styles/global.css';
import { captureAttribution } from './shared/tracking.js';

captureAttribution();

// Cada ruta carga su propio bundle: la landing no arrastrará el quiz, ni al revés.
const LandingPage = React.lazy(() => import('./landing/LandingPage.jsx'));
const QuizApp = React.lazy(() => import('./quiz/QuizApp.jsx'));

/** Redirección que conserva la query: los UTM y el fbclid no pueden perderse en el salto. */
function Redirect({ to }) {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: to, search, hash }} replace />;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizApp />} />
          <Route path="*" element={<Redirect to="/" />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
