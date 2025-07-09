const LoginHeader = ({ styles }) => (
  <>
    <div className="col-lg-5 d-none d-lg-block position-relative bg-primary">
      <div className={styles["diagonal-bg"]}></div>
      <div
        className={`position-absolute top-50 start-50 translate-middle text-center text-white ${styles["z-index-1"]} px-4`}
      >
        <h1 className="display-3 fw-bold mb-4">INAEBA</h1>
        <p className="lead mb-4">Instituto de Alfabetización y Educación Básica para Adultos en el Estado de Guanajuato</p>
        <div className="border-top border-white opacity-50 w-50 mx-auto my-4"></div>
        <p className="fs-5">Sistema de Asistencia Educativa</p>
      </div>
    </div>

    <div className={`col-12 d-lg-none bg-primary text-white text-center py-4 ${styles["header-mobile"]}`}>
      <h2 className="fw-bold mb-2">INAEBA</h2>
      <p className="mb-0 small px-3">Sistema de Asistencia Educativa</p>
    </div>
  </>
)

export default LoginHeader
