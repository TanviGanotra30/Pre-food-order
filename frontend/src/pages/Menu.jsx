import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import "./menu.css"

export default function Menu() {
  const [menu, setMenu] = useState([])
  const [cart, setCart] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    api.get("/menu").then((res) => setMenu(res.data))
  }, [])

  const addItem = (item) => {
    if (!item.is_available) return

    setCart((prev) => ({
      ...prev,
      [item.item_id]: {
        ...item,
        quantity: (prev[item.item_id]?.quantity || 0) + 1,
      },
    }))
  }

  const removeItem = (item) => {
    if (!item.is_available) return

    setCart((prev) => {
      const qty = (prev[item.item_id]?.quantity || 0) - 1
      if (qty <= 0) {
        const copy = { ...prev }
        delete copy[item.item_id]
        return copy
      }
      return {
        ...prev,
        [item.item_id]: { ...item, quantity: qty },
      }
    })
  }

  const goToOrder = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
    navigate("/order")
  }

  return (
  <div className="menu-bg">
    <div className="menu-glass">
      
      {/* HEADER */}
      <h2 className="menu-title">🍽 Today’s Menu</h2>

      {/* GRID */}
      <div className="menu-grid">
        {menu.map((item) => {
          const qty = cart[item.item_id]?.quantity || 0
          const disabled = !item.is_available

          return (
            <div className={`food-card ${disabled ? "disabled" : ""}`} key={item.item_id}>
              
              <div className="food-img">
                <img src="/food-placeholder.png" alt={item.name} />
              </div>

              <h3>{item.name}</h3>

              <div className="price">₹{item.price}</div>

              <div className="qty-controls">
                <button onClick={() => removeItem(item)} disabled={qty === 0}>−</button>
                <span>{qty}</span>
                <button onClick={() => addItem(item)} disabled={disabled}>+</button>
              </div>

              {disabled && <div className="overlay">Not Available</div>}
            </div>
          )
        })}
      </div>

      {Object.keys(cart).length > 0 && (
        <button className="checkout-btn" onClick={goToOrder}>
          Checkout
        </button>
      )}

    </div>
  </div>
)
}

