import { Eye, EyeOff, User, Lock, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"

const LoginForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, styles, errors }) => (
  <div className={`${styles.card} card border-0 shadow-lg mx-auto`} style={{ maxWidth: "500px" }}>
    <div className="card-body p-4 p-sm-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary mb-2">Iniciar Sesión</h2>
        <p className="text-muted small">Ingresa tus credenciales para acceder al sistema</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 mb-sm-4">
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
              placeholder="Ingresa tu usuario"
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

        <div className="mb-3 mb-sm-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label htmlFor="password" className="form-label fw-semibold small mb-0">
              Contraseña
            </label>
            <a href="#" className="text-decoration-none text-primary" style={{ fontSize: "0.8rem" }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <Lock size={16} className="text-primary" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control border-start-0 border-end-0 py-2"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="input-group-text bg-light border-start-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} className="text-muted" /> : <Eye size={16} className="text-muted" />}
            </button>
          </div>
          {errors.password && (
            <div className={`${styles["error-message"]} d-flex align-items-center mt-2`}>
              <AlertCircle size={14} className="me-1" />
              <span>{errors.password}</span>
            </div>
          )}
        </div>

        <div className="mb-3 mb-sm-4">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="remember"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            <label className="form-check-label small" htmlFor="remember">
              Recordar mis datos
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`${styles["btn-primary"]} btn btn-primary w-100 py-2 py-sm-3 mb-3 mb-sm-4 fw-semibold`}
        >
          Ingresar al Sistema
        </button>
      </form>

      <div className="text-center">
        <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-decoration-none text-primary">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  </div>
)

export default LoginForm
