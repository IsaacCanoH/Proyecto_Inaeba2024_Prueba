import { createContext, useContext, useState, useCallback } from "react";
import "../styles/toast.css"; // estilos personalizados
import "animate.css"; // animaciones de entrada/salida

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((type, message) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, type, message }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const value = {
        showSuccess: (msg) => showToast("success", msg),
        showError: (msg) => showToast("error", msg),
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                className="toast-container position-fixed top-0 end-0 p-3"
                style={{ zIndex: 1050 }}
            >
                {toasts.map(({ id, type, message }) => (
                    <div
                        key={id}
                        className={`toast align-items-center border-0 show animate__animated animate__fadeInRight animate__faster ${type === "success" ? "toast-success" : "toast-error"
                            }`}
                        role="alert"
                        style={{ minWidth: "280px", maxWidth: "350px" }}
                    >
                        <div className="d-flex">
                            <div className="toast-body fw-bold text-center px-4 py-3 w-100">
                                {message}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
