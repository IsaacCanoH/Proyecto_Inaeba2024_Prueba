import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import LoginHeader from "../components/Auth/LoginHeader";
import { login } from "../services/auth/authService";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/login.module.css";
import { useLoader } from "../context/LoaderContext";
import { useToast } from "../context/ToastContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    usuario: "",
    password: "",
  });

  const toastShown = useRef(false);

  const { showLoader, hideLoader } = useLoader();
  const { showSuccess, showError } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Manejador de cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.usuario.trim()) {
      newErrors.usuario = "El usuario es obligatorio";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Mostrar toast si el usuario viene de registro exitoso
  useEffect(() => {
    if (location.state?.registrado && !toastShown.current) {
      toastShown.current = true;
      showSuccess("Registro exitoso");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.state, showSuccess]);

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { usuario, password } = formData;

    try {
      showLoader();
      const result = await login(usuario, password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        showError(`Error: ${result.error}`);
      }
    } catch {
      showError(`Hubo un error inesperado`);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100">
      <div className="row g-0 min-vh-100">
        <LoginHeader styles={styles} />
        <div className="col-lg-7 col-12 d-flex justify-content-center py-3 py-lg-0 align-items-start align-items-lg-center">
          <div className="w-100 pt-0 px-3 px-sm-4 px-lg-5">
            <LoginForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              styles={styles}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
