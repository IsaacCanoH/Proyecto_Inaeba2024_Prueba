import { Eye, EyeOff, User, Lock, Mail, Phone, Shield, Users, UserCheck, Briefcase, AlertCircle } from "lucide-react"

const RegisterForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, direccionOptions, coordinacionOptions, jefaturaOptions, gruposOptions, municipioOptions, oficinaOptions, tipoBasesOptions, errors,styles }) => {

  return (
    <div className={`${styles.card} card border-0 shadow-lg mx-auto`}>
      <div className="card-body p-4 p-sm-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary mb-2">Registro de Usuario</h2>
          <p className="text-muted small">Complete todos los campos para crear su cuenta</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Sección: Información Personal */}
          <div className="mb-4">
            <h5 className="text-primary fw-semibold mb-3 d-flex align-items-center">
              <UserCheck size={18} className="me-2" />
              Información Personal
            </h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="nombre" className="form-label fw-semibold small">
                  Nombre
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <User size={16} className="text-primary" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 py-2"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </div>
                {errors.nombre && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.nombre}</span>
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="apellidoPaterno" className="form-label fw-semibold small">
                  Apellido Paterno
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <User size={16} className="text-primary" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 py-2"
                    id="apellidoPaterno"
                    name="apellidoPaterno"
                    placeholder="Apellido paterno"
                    value={formData.apellidoPaterno}
                    onChange={handleChange}
                  />
                </div>
                {errors.apellidoPaterno && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.apellidoPaterno}</span>
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="apellidoMaterno" className="form-label fw-semibold small">
                  Apellido Materno
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <User size={16} className="text-primary" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 py-2"
                    id="apellidoMaterno"
                    name="apellidoMaterno"
                    placeholder="Apellido materno"
                    value={formData.apellidoMaterno}
                    onChange={handleChange}
                  />
                </div>
                {errors.apellidoMaterno && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.apellidoMaterno}</span>
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="telefono" className="form-label fw-semibold small">
                  Teléfono
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Phone size={16} className="text-primary" />
                  </span>
                  <input
                    type="tel"
                    className="form-control border-start-0 py-2"
                    id="telefono"
                    name="telefono"
                    placeholder="10 dígitos"
                    value={formData.telefono}
                    onChange={handleChange}
                    maxLength="10"
                  />
                </div>
                {errors.telefono && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.telefono}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sección: Información Institucional */}
          <div className="mb-4">
            <h5 className="text-primary fw-semibold mb-3 d-flex align-items-center">
              <Mail size={18} className="me-2" />
              Información Institucional
            </h5>
            <div className="row">
              <div className="col-6 mb-3">
                <label htmlFor="correoInstitucional" className="form-label fw-semibold small">
                  Correo Institucional
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Mail size={16} className="text-primary" />
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 py-2"
                    id="correoInstitucional"
                    name="correoInstitucional"
                    placeholder="usuario@inaeba.edu.mx"
                    value={formData.correoInstitucional}
                    onChange={handleChange}
                  />
                </div>
                {errors.correoInstitucional && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.correoInstitucional}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sección: Información de Trabajo */}
          <div className="mb-4">
            <h5 className="text-primary fw-semibold mb-3 d-flex align-items-center">
              <Briefcase size={18} className="me-2" />
              Información de Trabajo
            </h5>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="direccion" className="form-label fw-semibold small">
                  Dirección
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Users size={16} className="text-primary" />
                  </span>
                  <select
                    className="form-select border-start-0 py-2"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione dirección</option>
                    {direccionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.direccion && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.direccion}</span>
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="coordinacion" className="form-label fw-semibold small">
                  Coordinación
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Users size={16} className="text-primary" />
                  </span>
                  <select
                    className="form-select border-start-0 py-2"
                    id="coordinacion"
                    name="coordinacion"
                    value={formData.coordinacion}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione coordinación</option>
                    {coordinacionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.coordinacion && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.coordinacion}</span>
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="jefatura" className="form-label fw-semibold small">
                  Jefatura
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Users size={16} className="text-primary" />
                  </span>
                  <select
                    className="form-select border-start-0 py-2"
                    id="jefatura"
                    name="jefatura"
                    value={formData.jefatura}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione jefatura</option>
                    {jefaturaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.jefatura && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.jefatura}</span>
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="oficinas" className="form-label fw-semibold small">
                  Oficinas
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Users size={16} className="text-primary" />
                  </span>
                  <select
                    className="form-select border-start-0 py-2"
                    id="oficinas"
                    name="oficinas"
                    value={formData.oficinas}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione oficinas</option>
                    {oficinaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.oficinas && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.oficinas}</span>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-lg-6 mb-3">
                <label htmlFor="tipoBase" className="form-label fw-semibold small">
                  Tipo de Base
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Users size={16} className="text-primary" />
                  </span>
                  <select
                    className="form-select border-start-0 py-2"
                    id="tipoBase"
                    name="tipoBase"
                    value={formData.tipoBase}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione tipo de base</option>
                    {tipoBasesOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.tipoBase && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.tipoBase}</span>
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="grupo" className="form-label fw-semibold small">
                  Grupo
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Users size={16} className="text-primary" />
                  </span>
                  <select
                    className="form-select border-start-0 py-2"
                    id="grupo"
                    name="grupo"
                    value={formData.grupo}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione horario</option>
                    {gruposOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.grupo && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.grupo}</span>
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="municipio" className="form-label fw-semibold small">
                  Municipio
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Users size={16} className="text-primary" />
                  </span>
                  <select
                    className="form-select border-start-0 py-2"
                    id="municipio"
                    name="municipio"
                    value={formData.municipio}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione municipio</option>
                    {municipioOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.municipio && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.municipio}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sección: Credenciales de Acceso */}
          <div className="mb-4">
            <h5 className="text-primary fw-semibold mb-3 d-flex align-items-center">
              <Shield size={18} className="me-2" />
              Credenciales de Acceso
            </h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="usuario" className="form-label fw-semibold small">
                  Usuario
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <User size={16} className="text-primary" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 py-2"
                    id="usuario"
                    name="usuario"
                    placeholder="Nombre de usuario"
                    value={formData.usuario}
                    onChange={handleChange}
                  />
                </div>
                {errors.usuario && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.usuario}</span>
                  </div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="pin" className="form-label fw-semibold small">
                  PIN (4 dígitos)
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Shield size={16} className="text-primary" />
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0 py-2"
                    id="pin"
                    name="pin"
                    placeholder="••••"
                    value={formData.pin}
                    onChange={handleChange}
                    maxLength="4"
                  />
                </div>
                {errors.pin && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.pin}</span>
                  </div>
                )}
              </div>

              <div className="col-6 mb-3">
                <label htmlFor="password" className="form-label fw-semibold small">
                  Contraseña SAU
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Lock size={16} className="text-primary" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control border-start-0 border-end-0 py-2"
                    id="password"
                    name="password"
                    placeholder="Ingresa la contraseña"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light border-start-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={16} className="text-muted" />
                    ) : (
                      <Eye size={16} className="text-muted" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
                    <AlertCircle size={14} className="me-1" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`${styles["btn-primary"]} btn btn-primary w-100 py-2 py-sm-3 mb-3 mb-sm-4 fw-semibold`}
          >
            Registrar Usuario
          </button>
        </form>

        <div className="text-center">
          <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-decoration-none text-primary">
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
