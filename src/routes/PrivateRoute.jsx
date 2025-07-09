import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const storedUser = localStorage.getItem("usuario");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    const usuario = JSON.parse(storedUser);

    if (!usuario || !usuario.nombre) {
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
