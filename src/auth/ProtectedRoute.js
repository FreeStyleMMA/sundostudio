import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import React, { useState, useEffect } from 'react';


const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, fetchRoles } = useAuth();
  console.log(allowedRoles);

  const [hasAccess, setHasAccess] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchRoles().then(roles => {
      if (!mounted) return;
      if (allowedRoles.some(role => roles.includes(role))) {
        setHasAccess(true);
      }
      setChecked(true);
    });
    return () => { mounted = false; };
  }, [allowedRoles, fetchRoles]);

  if (loading) return <p> 로딩중</p>;
  // if (!user) return <Navigate to="/login" replace />;
  if (!checked) return <p>권한 확인 중...</p>;
  if (!hasAccess) return <Navigate to="/" replace />;


  return <Outlet />;

};

export default ProtectedRoute;