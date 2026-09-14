import React, { Component, ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught runtime error in MEMOVERSE:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "system-ui, -apple-system, sans-serif", backgroundColor: "#fff8f8", minHeight: "100vh", color: "#252c30", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🌿</div>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#7a1c1c", marginBottom: "8px" }}>MEMOVERSE Archival</h1>
          <p style={{ fontSize: "16px", fontWeight: "600", color: "#555", marginBottom: "20px" }}>An unexpected application state occurred.</p>
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "12px", fontSize: "13px", color: "#e53e3e", fontFamily: "monospace", maxWidth: "600px", width: "100%", marginBottom: "24px", wordBreak: "break-word" }}>
            {this.state.error?.message || "Unknown error"}
          </div>
          <button
            onClick={() => {
              try {
                localStorage.removeItem("memoverse_game_performance_history");
                localStorage.removeItem("memoverse_skill_profiles");
              } catch {}
              window.location.hash = "";
              window.location.reload();
            }}
            style={{ padding: "14px 28px", fontSize: "15px", fontWeight: "800", backgroundColor: "#7a1c1c", color: "#ffffff", border: "none", borderRadius: "14px", cursor: "pointer", boxShadow: "0 4px 12px rgba(122,28,28,0.2)" }}
          >
            🔄 Reset App State & Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
