import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "./navbar.css"

export default function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const username = localStorage.getItem("name") || "Student"

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="navbar-glass">
      
      {/* LEFT */}
      <div className="navbar-left">
        Hello, <span>{username}</span>
      </div>

      {/* CENTER */}
      <div className="navbar-center">
        <Link
          to="/menu"
          className={`nav-pill ${
            location.pathname === "/menu" ? "active" : ""
          }`}
        >
          Menu
        </Link>

        <Link
          to="/menu/orders"
          className={`nav-pill ${
            location.pathname === "/menu/orders" ? "active" : ""
          }`}
        >
          My Orders
        </Link>

        <Link
          to="/order"
          className="nav-pill primary"
        >
          Place Order
        </Link>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </nav>
  )
}