// // import { useState } from "react"
// // import { useNavigate, Link } from "react-router-dom"
// // import api from "../services/api"
// // import { useAuth } from "../context/AuthContext"
// // import "./auth.css"

// // export default function Register() {
// //   const [name, setName] = useState("")
// //   const [phone, setPhone] = useState("")
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [error, setError] = useState("")
// //   const navigate = useNavigate()
// //   const { login } = useAuth()

// //   const isValidEmail = (email) => {
// //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setError("")

// //     // ✅ Frontend validations
// //     if (!name.trim()) {
// //       setError("Name is required")
// //       return
// //     }

// //     if (!/^\d{10}$/.test(phone)) {
// //       setError("Phone number must be exactly 10 digits")
// //       return
// //     }

// //     if (!isValidEmail(email)) {
// //       setError("Please enter a valid email address")
// //       return
// //     }

// //     if (password.length < 6) {
// //       setError("Password must be at least 6 characters")
// //       return
// //     }

// //     try {
// //       const res = await api.post("/auth/register", {
// //         name: name.trim(),
// //         phone,
// //         email,
// //         password,
// //       })

// //       // ✅ auto login after register
// //       login(res.data.access_token)
// //       localStorage.setItem("name", res.data.name)
// //       localStorage.setItem("role", res.data.role)

// //       navigate("/menu")
// //     } catch (err) {
// //       setError(
// //         err.response?.data?.detail ||
// //         "Registration failed. Phone or email may already exist."
// //       )
// //     }
// //   }

// //   return (
// //     <div className="auth-container">
// //       <div className="auth-card">
// //         <h2>Register</h2>

// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="text"
// //             placeholder="Name"
// //             value={name}
// //             onChange={(e) => setName(e.target.value)}
// //             required
// //           />

// //           <input
// //             type="text"
// //             placeholder="Phone (10 digits)"
// //             value={phone}
// //             onChange={(e) =>
// //               setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
// //             }
// //             inputMode="numeric"
// //             pattern="[0-9]*"
// //             required
// //           />
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //           />

// //           <input
// //             type="password"
// //             placeholder="Password (min 6 chars)"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //           />

// //           <button type="submit">Register</button>
// //         </form>

// //         {error && <p className="auth-error">{error}</p>}

// //         <p className="auth-switch">
// //           Already have an account? <Link to="/login">Login</Link>
// //         </p>
// //       </div>
// //     </div>
// //   )
// // }


// import { useState } from "react"
// import { useNavigate, Link } from "react-router-dom"
// import api from "../services/api"
// import "./auth.css"

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//   })

//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     await api.post("/auth/register", form)
//     navigate("/login")
//   }

//   return (
//     <div className="auth-gradient-page">
//       <div className="auth-mobile-card">
//         <h3 className="auth-brand">Welcome to</h3>
//         <h2 className="auth-title">TASTYFOOD</h2>

//         <form onSubmit={handleSubmit}>
//           <input name="name" placeholder="Full Name" onChange={handleChange} required />
//           <input name="email" placeholder="Email" onChange={handleChange} required />
//           <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//           <input name="phone" placeholder="Phone Number" onChange={handleChange} required />

//           <button className="auth-main-btn" type="submit">
//             Signup
//           </button>
//         </form>

//         <p className="auth-switch">
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   )
// }



import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"
import bgVideo from "../assets/Premium_Restaurant_Aesthetic_Video.mp4"
import "./auth.css"

export default function Register() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()
  const { login } = useAuth()

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // ✅ validations (UNCHANGED)
    if (!name.trim()) {
      setError("Name is required")
      return
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits")
      return
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    try {
      const res = await api.post("/auth/register", {
        name: name.trim(),
        phone,
        email,
        password,
      })

      // ✅ auto login after register
      login(res.data.access_token, res.data.role)
      localStorage.setItem("name", res.data.name)
      localStorage.setItem("role", res.data.role)

      navigate("/menu")
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Registration failed. Phone or email may already exist."
      )
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

      {/* Overlay */}
      <div className="auth-video-overlay"></div>

      {/* Card */}
      <div className="auth-mobile-card">
        <h3 className="auth-brand">Welcome to</h3>
        <h2 className="auth-title">TASTYFOOD</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone (10 digits)"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            inputMode="numeric"
            pattern="[0-9]*"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-main-btn" type="submit">
            Signup
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}
