import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
    <>
        <App />
        {/* 🔥 Global toast container */}
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    background: "#1a1a1a",
                    color: "#fff",
                    borderRadius: "10px",
                    border: "1px solid #ffcc00",
                },
                success: {
                    iconTheme: {
                        primary: "#ffcc00",
                        secondary: "#1a1a1a",
                    },
                },
                error: {
                    iconTheme: {
                        primary: "#ff4444",
                        secondary: "#1a1a1a",
                    },
                },
            }}
        />
    </>
);
