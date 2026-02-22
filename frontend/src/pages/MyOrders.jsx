import { useEffect, useState } from "react"
import api from "../services/api"
import "./myOrders.css"

export default function MyOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get("/orders/my")
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : [])
      })
      .catch(() => {
        setOrders([])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading orders...</p>

  return (
    <div className="orders-bg">
  <div className="orders-page">
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => {
        const items = Array.isArray(order.items) ? order.items : []
        const total =
          typeof order.total_price === "number" ? order.total_price : 0

        return (
          <div
            key={order.order_id}
            className="order-card"
          >
            {/* Header */}
            <div className="order-header">
              <div><b>Order ID:</b> {order.order_id}</div>
              <div><b>Time Slot:</b> {order.time_slot}</div>

              <div>
                <b>Status:</b>{" "}
                <span className={`status-badge ${order.status}`}>
                  {order.status}
                </span>
              </div>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <p>No items found for this order</p>
            ) : (
              <table width="100%" className="order-table">
                <thead>
                  <tr>
                    <th align="left">Item</th>
                    <th align="right">Price</th>
                    <th align="right">Qty</th>
                    <th align="right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.item_name}</td>
                      <td align="right">₹{item.price}</td>
                      <td align="right">{item.quantity}</td>
                      <td align="right">₹{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Total */}
            <div className="order-total">
              Total: ₹{total}
            </div>
          </div>
        )
      })}
    </div>
    </div>
  )
}
