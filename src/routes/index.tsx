import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Authentication/Login';
import Home from '../pages/Main/Home';
import ImportNorm from '../pages/Main/ImportNorm';
import Norms from '../pages/Main/Norms';
import NotFound from '../pages/Main/NotFound';

export default function Router() {
  return (
    <Routes >
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/normas" element={<Norms />} />
      <Route path="/importar" element={<ImportNorm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
