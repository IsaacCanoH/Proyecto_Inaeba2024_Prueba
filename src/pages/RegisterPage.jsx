import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/Auth/RegisterForm";
import RegisterHeader from "../components/Auth/RegisterHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/register.module.css";
import { useLoader } from "../context/LoaderContext";
import { useToast } from "../context/ToastContext";

import {
  getDirecciones,
  getCoordinacionesByDireccion,
  getJefaturasByCoordinacion,
  getHorarios,
  getMunicipios,
  getOficinas,
  getTipoBases,
  registrarEmpleado,
} from "../services/register/registerService";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [direcciones, setDirecciones] = useState([]);
  const [coordinaciones, setCoordinaciones] = useState([]);
  const [jefaturas, setJefaturas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [oficinas, setOficinas] = useState([]);
  const [tipoBases, setTipoBases] = useState([])
  const [errors, setErrors] = useState({});

  const { showLoader, hideLoader } = useLoader();
  const { showError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correoInstitucional: "",
    usuario: "",
    password: "",
    pin: "",
    direccion: "",
    coordinacion: "",
    jefatura: "",
    oficinas: "",
    tipoBase: "",
    grupo: "",
    municipio: "",
    telefono: "",
  });

  // Carga de catálogos iniciales
  useEffect(() => {
    const fetchCatalogosIniciales = async () => {
      const [dataDirecciones, dataHorarios, dataMunicipios, dataOficinas, dataTipoBases] = await Promise.all([
        getDirecciones(),
        getHorarios(),
        getMunicipios(),
        getOficinas(),
        getTipoBases(),
      ]);

      setDirecciones(dataDirecciones);
      setGrupos(dataHorarios);
      setMunicipios(dataMunicipios);
      setOficinas(dataOficinas);
      setTipoBases(dataTipoBases);
    };

    fetchCatalogosIniciales();
  }, []);

  // Coordinaciones dependientes de dirección
  useEffect(() => {
    const fetchCoordinaciones = async () => {
      if (formData.direccion) {
        const data = await getCoordinacionesByDireccion(formData.direccion);
        setCoordinaciones(data);
      } else {
        setCoordinaciones([]);
      }
    };

    fetchCoordinaciones();
  }, [formData.direccion]);

  // Jefaturas dependientes de coordinación
  useEffect(() => {
    const fetchJefaturas = async () => {
      if (formData.coordinacion) {
        const data = await getJefaturasByCoordinacion(formData.coordinacion);
        setJefaturas(data);
      } else {
        setJefaturas([]);
      }
    };

    fetchJefaturas();
  }, [formData.coordinacion]);

  // Manejador de cambio de inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validación de formulario
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    const requiredFields = [
      { key: "nombre", label: "El nombre es obligatorio" },
      { key: "apellidoPaterno", label: "El apellido paterno es obligatorio" },
      { key: "apellidoMaterno", label: "El apellido materno es obligatorio" },
      { key: "correoInstitucional", label: "El correo es obligatorio" },
      { key: "usuario", label: "El usuario es obligatorio" },
      { key: "password", label: "La contraseña es obligatoria" },
      { key: "pin", label: "El PIN es obligatorio" },
      { key: "direccion", label: "Seleccione una dirección" },
      { key: "coordinacion", label: "Seleccione una coordinación" },
      { key: "jefatura", label: "Seleccione una jefatura" },
      { key: "oficinas", label: "Seleccione una oficina" },
      { key: "tipoBase", label: "Seleccione un tipo de base" },
      { key: "grupo", label: "Seleccione un horario" },
      { key: "municipio", label: "Seleccione un municipio" },
      { key: "telefono", label: "El teléfono es obligatorio" },
    ];

    requiredFields.forEach(({ key, label }) => {
      if (!formData[key] || (typeof formData[key] === "string" && formData[key].trim() === "")) {
        newErrors[key] = label;
        isValid = false;
      }
    });

    if (
      formData.correoInstitucional &&
      !formData.correoInstitucional.endsWith("@inaeba.edu.mx")
    ) {
      newErrors.correoInstitucional = "El correo debe pertenecer al dominio inaeba.edu.mx";
      isValid = false;
    }

    if (formData.pin && formData.pin.length !== 4) {
      newErrors.pin = "El PIN debe tener 4 dígitos";
      isValid = false;
    }

    if (formData.telefono && formData.telefono.length !== 10) {
      newErrors.telefono = "El teléfono debe tener 10 dígitos";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Manejador de envío de formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData()
    formDataToSend.append("nombre", formData.nombre)
    formDataToSend.append("ap_paterno", formData.apellidoPaterno)
    formDataToSend.append("ap_materno", formData.apellidoMaterno)
    formDataToSend.append("email", formData.correoInstitucional)
    formDataToSend.append("usuario", formData.usuario)
    formDataToSend.append("clave_acceso", formData.password)
    formDataToSend.append("ping_hash", formData.pin)
    formDataToSend.append("id_direccion", parseInt(formData.direccion))
    formDataToSend.append("id_coordinacion", parseInt(formData.coordinacion))
    formDataToSend.append("id_jefatura", parseInt(formData.jefatura))
    formDataToSend.append("id_oficina", parseInt(formData.oficinas))
    formDataToSend.append("id_tipo_usuario", parseInt(formData.tipoBase))
    formDataToSend.append("ig_grupo_horario", parseInt(formData.grupo))
    formDataToSend.append("id_municipio", parseInt(formData.municipio))
    formDataToSend.append("telefono", formData.telefono)


    try {
      showLoader();
      const resultado = await registrarEmpleado(formDataToSend);
      console.log("Registro exitoso:", resultado);
      navigate("/login", { state: { registrado: true } });
    } catch (error) {
      showError("Error al registrar usuario");
      console.log(error.message);
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="container-fluid p-0 min-vh-100">
      <RegisterHeader styles={styles} />
      <div className="row g-0 justify-content-center py-4">
        <div className="col-12 d-flex justify-content-center">
          <div className="w-100 px-3 px-sm-4 px-lg-5" style={{ maxWidth: "1000px" }}>
            <RegisterForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              direccionOptions={direcciones}
              coordinacionOptions={coordinaciones}
              jefaturaOptions={jefaturas}
              gruposOptions={grupos}
              municipioOptions={municipios}
              oficinaOptions={oficinas}
              tipoBasesOptions={tipoBases}
              errors={errors}
              styles={styles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
