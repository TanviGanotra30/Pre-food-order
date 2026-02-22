import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import TimeSlotPicker from "../components/TimeSlotPicker"
import "./order.css"

export default function Order() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [slot, setSlot] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart")
      if (!raw) {
        navigate("/menu")
        return
      }

      const cartObj = JSON.parse(raw)
      const arr = Object.values(cartObj)

      if (!Array.isArray(arr) || arr.length === 0) {
        navigate("/menu")
        return
      }

      setItems(arr)
    } catch {
      localStorage.removeItem("cart")
      navigate("/menu")
    }
  }, [navigate])

  const totalAmount = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  )

  const placeOrder = async () => {
    if (!slot) {
      setError("Please select a time slot")
      return
    }

    setLoading(true)
    setError("")

    try {
      await api.post("/orders", {
        time_slot: slot,
        items: items.map((i) => ({
          item_id: i.item_id,
          quantity: i.quantity,
        })),
      })

      localStorage.removeItem("cart")
      navigate("/menu/orders")
    } catch (err) {
      setError("Order failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="order-bg">
  <div className="order-page">
      <h2 className="order-title">🧾 Confirm Order</h2>

      <div className="bill">
        {items.map((i) => (
          <div className="bill-row" key={i.item_id}>
            <div className="bill-item">
              <span className="item-name">{i.name}</span>
              <span className="item-meta">
                ₹{i.price} × {i.quantity}
              </span>
            </div>
            <span className="item-amount">
              ₹{i.price * i.quantity}
            </span>
          </div>
        ))}

        <div className="bill-divider" />

        <div className="bill-total">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <div className="slot-wrap">
        <TimeSlotPicker value={slot} onChange={setSlot} />
      </div>

      <button
        className="place-order-btn"
        onClick={placeOrder}
        disabled={loading}
      >
        {loading ? "Placing..." : "Place Order"}
      </button>

      {error && <p className="order-error">{error}</p>}
    </div>
    </div>
  )
}
