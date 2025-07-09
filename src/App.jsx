import React from "react";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes"
import { precargarCatalogos } from "./services/register/catalogosCacheService";

const App = () => {
  useEffect(() => {
    precargarCatalogos();
  }, []); 

  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
