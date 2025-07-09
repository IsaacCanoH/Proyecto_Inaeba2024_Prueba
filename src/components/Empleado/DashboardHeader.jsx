import { Bell, LogOut } from "lucide-react"

const DashboardHeader = ({
  usuario,
  unreadCount,
  showNotifications,
  setShowNotifications,
  notificationRef,
  notifications,
  markAllAsRead,
  markAsRead,
  deleteNotification,
  getNotificationIcon,
  getNotificationBadgeColor,
  styles,
  handleLogout
}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary shadow-sm border-bottom py-4">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center">
          <div className="me-3 d-flex align-items-center justify-content-center">
            <span className="text-white fw-bold fs-4">INAEBA</span>
          </div>
          <div className="d-none d-md-block">
            <h6 className="mb-0 text-white fw-semibold">Sistema de Administración</h6>
            <small className="text-white opacity-75">Gestión de Asistencias</small>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-none d-lg-flex align-items-center me-3">
            <img
              src={"/images/avt_default.png"}
              className="rounded-circle me-3"
              width="36"
              height="36"
              style={{ border: "2px solid #ffffff" }}
            />
            <div>
              <div className="fw-semibold text-white">{usuario.nombre} {usuario.apellido_p} {usuario.apellido_m}</div>
              <div className="text-white opacity-75 small">{usuario.email}</div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="position-relative" ref={notificationRef}>
            <button
              className="btn btn-light btn-sm rounded-circle p-2 position-relative d-flex align-items-center justify-content-center"
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ width: "40px", height: "40px" }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-flex align-items-center justify-content-center"
                  style={{ fontSize: "0.65rem", minWidth: "18px", height: "18px" }}
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                className={`position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border ${styles.notificationDropdown}`}
                style={{ width: "400px", maxWidth: "95vw", zIndex: 1050 }}
              >
                <div className="p-4 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0 fw-semibold d-flex align-items-center">
                      <Bell size={18} className="me-2 text-primary" />
                      Notificaciones
                    </h6>
                    <div className="d-flex gap-2 align-items-center">
                      {unreadCount > 0 && (
                        <button
                          className="btn btn-sm btn-outline-primary d-flex align-items-center"
                          onClick={markAllAsRead}
                          style={{ fontSize: "0.75rem" }}
                        >
                          ✔ Marcar todas
                        </button>
                      )}
                      <button
                        className="btn btn-sm btn-light rounded-circle p-1 d-flex align-items-center justify-content-center"
                        onClick={() => setShowNotifications(false)}
                        style={{ width: "28px", height: "28px" }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`notification-list ${styles.notificationList}`}>
                  {notifications.length === 0 ? (
                    <div className="text-center py-5">
                      <div className="d-flex align-items-center justify-content-center mb-3">
                        <Bell size={32} className="text-muted" />
                      </div>
                      <p className="text-muted mb-0">No tienes notificaciones</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-bottom ${styles.notificationItem} ${!notification.leida ? styles.notificationUnread : ""
                          }`}
                      >
                        <div className="d-flex align-items-start">
                          <div className="me-3 mt-1 d-flex align-items-center justify-content-center">
                            {getNotificationIcon(notification.tipo)}
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div className="d-flex align-items-center">
                                <h6 className="mb-0 fw-semibold me-2" style={{ fontSize: "0.9rem" }}>
                                  {notification.titulo}
                                </h6>
                                {!notification.leida && (
                                  <span
                                    className={`badge rounded-pill ${getNotificationBadgeColor(notification.tipo)} d-flex align-items-center`}
                                    style={{ fontSize: "0.65rem" }}
                                  >
                                    Nuevo
                                  </span>
                                )}
                              </div>
                              <div className="d-flex gap-1">
                                {!notification.leida && (
                                  <button
                                    className="btn btn-sm btn-light rounded-circle p-1 d-flex align-items-center justify-content-center"
                                    onClick={() => markAsRead(notification.id)}
                                    style={{ width: "24px", height: "24px" }}
                                  >
                                    ✔
                                  </button>
                                )}
                                <button
                                  className="btn btn-sm btn-light rounded-circle p-1 d-flex align-items-center justify-content-center"
                                  onClick={() => deleteNotification(notification.id)}
                                  style={{ width: "24px", height: "24px" }}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                            <p className="mb-2 text-muted" style={{ fontSize: "0.85rem", lineHeight: "1.4" }}>
                              {notification.mensaje}
                            </p>
                            <small className="text-muted" style={{ fontSize: "0.75rem" }}>
                              {notification.fecha}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-3 text-center border-top">
                    <button className="btn btn-sm btn-outline-primary d-flex align-items-center mx-auto">
                      <Bell size={14} className="me-2" />
                      Ver todas las notificaciones
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="btn btn-light btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
            onClick={handleLogout}
          >
            <LogOut size={18} />
          </button>

        </div>
      </div>
    </nav>
  )
}

export default DashboardHeader
