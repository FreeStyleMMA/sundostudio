import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  // 로그인 안된거 처리
  if (!token) return <Navigate to="/login" />

  const decoded = jwtDecode(token);
  const userRoles = decoded.roles || [];

  const hasAccess = allowedRoles.some(role => userRoles.includes(role));
  // 권한 없음 처리
  if (!hasAccess) return <Navigate to="/unauthorized" />;

  return children;

}
export default PrivateRoute;