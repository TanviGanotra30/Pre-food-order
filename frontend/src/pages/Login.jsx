import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"
import bgVideo from "../assets/Premium_Restaurant_Aesthetic_Video.mp4"
import "./auth.css"

export default function Login() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

  try {
    const res = await api.post("/auth/login", {
      identifier,
      password,
    })

    login(res.data.access_token, res.data.role)
    localStorage.setItem("name", res.data.name)
    navigate("/menu")
  } catch {
    setError("Invalid phone/email or password")
  } finally {
    setLoading(false)
  }

    try {
      const res = await api.post("/auth/login", {
        identifier,
        password,
      })

      login(res.data.access_token, res.data.role)
      localStorage.setItem("name", res.data.name)
      navigate("/menu")
    } catch {
      setError("Invalid phone/email or password")
    }
  }

  return (
    <div className="auth-video-page">
      {/* Background Video */}
      <video
        className="auth-bg-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="auth-video-overlay"></div>

      {/* Auth Card */}
      <div className="auth-mobile-card">
        <h3 className="auth-brand">Welcome to</h3>
        <h2 className="auth-title">TASTYFOOD</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button
  className="auth-main-btn"
  type="submit"
  disabled={loading}
>
  {loading ? (
    <span className="btn-loader"></span>
  ) : (
    "Login Now"
  )}
</button>
        </form>

        <p className="auth-switch">
          Don’t have an account? <Link to="/register">Signup Now</Link>
        </p>
      </div>
    </div>
  )
}
