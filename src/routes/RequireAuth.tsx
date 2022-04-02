import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/auth';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <Navigate to="/" replace />
  }

  return children;
}
